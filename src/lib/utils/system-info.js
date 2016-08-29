// This library contains several chunks of code from Sebastian Hildebrandt's
// systeminformation library, MIT
// https://github.com/sebhildebrandt/systeminformation

/* global process */

import os from 'os'
import fs from 'fs'
import { exec } from 'child_process'

const PLATFORM = os.type(),
  LINUX = (PLATFORM == 'Linux'),
  DARWIN = (PLATFORM == 'Darwin'),
  WINDOWS = (PLATFORM == 'Windows_NT'),
  NOT_SUPPORTED = 'not supported',
  MATCH_SPACES = / +/g,
  NETWORK = {}

let defaultInterface

const isFunction = fn =>
  fn && {}.toString.call(fn) === '[object Function]'

const splitOutput = output => output.toString().split('\n')

const splitWithAndTrim = (output, pattern) => output.split(pattern)[1].trim()

export const time = () => ({
  current: Date.now(),
  uptime: os.uptime()
})

/**
 * Gather the memory systema information
 *
 * @param {function} callback Fallback function
 * @returns Promise
 */
export const mem = callback =>
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (WINDOWS) {
        let error = new Error(NOT_SUPPORTED)

        if (callback) {
          callback(NOT_SUPPORTED)
        }

        reject(error)
      }

      const result = {
        total: os.totalmem(),
        free: os.freemem(),
        used: os.totalmem() - os.freemem(),

        // temporarily (fallback)
        active: os.totalmem() - os.freemem(),
        available: os.freemem(),

        buffcache: 0,

        swaptotal: 0,
        swapused: 0,
        swapfree: 0
      }

      if (LINUX) {
        exec('free -b', (error, stdout) => {
          if (!error) {
            const rawOutput = splitOutput(stdout)
            let mem = rawOutput[1].replace(MATCH_SPACES, ' ').split(' ')

            result.total = parseInt(mem[1])
            result.free = parseInt(mem[3])

            if (rawOutput.length === 4) {
              // free (since free von procps-ng 3.3.10)
              result.buffcache = parseInt(mem[5])
              result.available = parseInt(mem[6])
              mem = rawOutput[2].replace(MATCH_SPACES, ' ').split(' ')
            } else {
              // free (older versions)
              result.buffcache = parseInt(mem[5]) + parseInt(mem[6])
              result.available = result.free + result.buffcache
              mem = rawOutput[3].replace(MATCH_SPACES, ' ').split(' ')
            }

            result.active = result.total - result.free - result.buffcache

            result.swaptotal = parseInt(mem[1])
            result.swapfree = parseInt(mem[3])
            result.swapused = parseInt(mem[2])
          }

          if (callback) {
            callback(result)
          }

          resolve(result)
        })
      }

      if (DARWIN) {
        exec('vm_stat | grep \'Pages active\'', (error, stdout) => {
          if (!error) {
            const rawOutput = splitOutput(stdout)

            result.active = parseInt(rawOutput[0].split(':')[1]) * 4096
            result.buffcache = result.used - result.active
            result.available = result.free + result.buffcache
          }

          exec('sysctl -n vm.swapusage', (error, stdout) => {
            if (!error) {
              const rawOutput = splitOutput(stdout)

              if (rawOutput.length > 0) {
                const output = rawOutput[0].replace(/,/g, '.').replace(/M/g, '').trim().split('  '),
                  types = [ 'total', 'used', 'free' ]

                types.forEach((type, index) => {
                  if (output[index].toLowerCase().includes(type)) {
                    result[`swap${type}`] = parseFloat(output[index].split('=')[1].trim()) * 1024 * 1024
                  }
                })
              }
            }

            if (callback) {
              callback(result)
            }

            resolve(result)
          })
        })
      }
    })
  })

/**
 * Gather the battery system information
 *
 * @param {function} callback Fallback function
 * @returns Promise
 */
export const battery = callback =>
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (WINDOWS) {
        const error = new Error(NOT_SUPPORTED)

        if (callback) {
          callback(NOT_SUPPORTED)
        }

        reject(error)
      }

      const result = {
        hasbattery: false,
        cyclecount: 0,
        ischarging: false,
        maxcapacity: 0,
        currentcapacity: 0,
        percent: 0
      }

      if (LINUX) {
        let battery_path = ''

        if (fs.existsSync('/sys/class/power_supply/BAT1/status')) {
          battery_path = '/sys/class/power_supply/BAT1/'
        } else if (fs.existsSync('/sys/class/power_supply/BAT0/status')) {
          battery_path = '/sys/class/power_supply/BAT0/'
        }

        if (battery_path) {
          exec('cat ' + battery_path + 'status', (error, stdout) => {
            if (!error) {
              const rawOutput = splitOutput(stdout)

              if (rawOutput.length > 0 && rawOutput[0]) {
                result.ischarging = (rawOutput[0].trim().toLowerCase() == 'charging')
              }
            }

            exec('cat ' + battery_path + 'cyclec_ount', (error, stdout) => {
              if (!error) {
                const rawOutput = splitOutput(stdout)

                if (rawOutput.length > 0 && rawOutput[0]) {
                  result.cyclecount = parseFloat(rawOutput[0].trim())
                }
              }

              exec('cat ' + battery_path + 'charge_full', (error, stdout) => {
                if (!error) {
                  const rawOutput = splitOutput(stdout)

                  if (rawOutput.length > 0 && rawOutput[0]) {
                    result.maxcapacity = parseFloat(rawOutput[0].trim())
                  }
                }

                exec('cat ' + battery_path + 'charge_now', (error, stdout) => {
                  if (!error) {
                    const rawOutput = splitOutput(stdout)

                    if (rawOutput.length > 0 && rawOutput[0]) {
                      result.currentcapacity = parseFloat(rawOutput[0].trim())
                    }
                  }

                  if (result.maxcapacity && result.currentcapacity) {
                    result.hasbattery = true
                    result.percent = 100 * result.currentcapacity / result.maxcapacity
                  }

                  if (callback) {
                    callback(result)
                  }

                  resolve(result)
                })
              })
            })
          })
        } else {
          if (callback) {
            callback(result)
          }

          resolve(result)
        }
      }

      if (DARWIN) {
        exec('ioreg -n AppleSmartBattery -r | grep \'"CycleCount"\'' +
          'ioreg -n AppleSmartBattery -r | grep \'"IsCharging"\'' +
          'ioreg -n AppleSmartBattery -r | grep \'"MaxCapacity"\'' +
          'ioreg -n AppleSmartBattery -r | grep \'"CurrentCapacity"\'',
          (error, stdout) => {
            if (!error) {
              const rawOutput = stdout.toString().replace(MATCH_SPACES, '').replace(/"+/g, '').split('\n')

              rawOutput.forEach(output => {
                if (output.includes('=')) {
                  const lowerCaseOutput = output.toLowerCase()

                  if (lowerCaseOutput.includes('cyclecount')) {
                    result.cyclecount = parseFloat(splitWithAndTrim(output, '='))
                  }

                  if (lowerCaseOutput.includes('ischarging')) {
                    result.ischarging = (splitWithAndTrim(output, '=').toLowerCase() == 'yes')
                  }

                  if (lowerCaseOutput.includes('maxcapacity')) {
                    result.maxcapacity = parseFloat(splitWithAndTrim(output, '='))
                  }

                  if (lowerCaseOutput.includes('currentcapacity')) {
                    result.currentcapacity = parseFloat(splitWithAndTrim(output, '='))
                  }
                }
              })
            }

            if (result.maxcapacity && result.currentcapacity) {
              result.hasbattery = true
              result.percent = 100.0 * result.currentcapacity / result.maxcapacity
            }

            if (callback) {
              callback(result)
            }

            resolve(result)
          })
      }
    })
  })

/**
 * Get the name of the first external network interface listed
 *
 * @returns {string}
 */
const getFirstExternalNetworkInterface = () => {
  const ifaces = os.networkInterfaces()

  return Object.keys(ifaces)
    .map(iface =>
      ifaces[iface]
        .reduce((acc, data) =>
            acc === '' && data.internal === false
              ? iface
              : acc
          , '')
    )
    .filter(x => x !== '')
    .shift()
}

/**
 * Fetch the network interfaces information, call the callback
 * passing the information array, and returns a Promise with
 * all the gathered network information
 *
 * @param {function} callback One arity function
 * @returns Promise
 */
export const networkInterfaces = callback =>
  new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (WINDOWS) {
        const error = new Error(NOT_SUPPORTED)

        if (callback) {
          callback(NOT_SUPPORTED)
        }

        reject(error)
      }

      const ifaces = os.networkInterfaces(),
        result = []

      for (let iface in ifaces) {
        let ip4 = '',
          ip6 = ''

        if (ifaces.hasOwnProperty(iface)) {
          ifaces[iface].forEach(details => {
            if (details.family === 'IPv4') {
              ip4 = details.address
            }

            if (details.family === 'IPv6') {
              ip6 = details.address
            }
          })

          const internal = (ifaces[iface] && ifaces[iface][0])
            ? ifaces[iface][0].internal
            : null

          result.push({ iface: iface, ip4, ip6, internal })
        }
      }

      if (callback) {
        callback(result)
      }

      resolve(result)
    })
  })

/**
 * Calculates the download (rx) and upload (tx) network speed
 * per second based in the previous recorded values
 *
 * @param {string} iface Network interface name
 * @param {number} rx Downloaded bytes per millisecond
 * @param {number} tx Uploaded bytes per millisecond
 * @returns {{rx_sec: number, tx_sec: number, ms: number}}
 */
const calcNetworkSpeed = (iface, rx, tx) => {
  let rx_sec = 0,
    tx_sec = 0,
    ms = 0

  if (NETWORK[iface] && NETWORK[iface].ms) {
    ms = Date.now() - NETWORK[iface].ms
    rx_sec = (rx - NETWORK[iface].rx) / (ms / 1000)
    tx_sec = (tx - NETWORK[iface].tx) / (ms / 1000)
  } else {
    NETWORK[iface] = {}
  }

  NETWORK[iface].rx = rx
  NETWORK[iface].tx = tx
  NETWORK[iface].ms = Date.now()

  return ({
    rx_sec: Number.isFinite(rx_sec) ? rx_sec : 0,
    tx_sec: Number.isFinite(tx_sec) ? tx_sec : 0,
    ms: ms
  })
}

/**
 * Fetch the network statistics and returns a Promise to show
 * several statistics related with data transmission
 *
 * @param {string} iface Network interface name
 * @param {function} callback Fallback function
 * @returns {Promise}
 */
export const networkStats = (iface, callback) => {
  if (isFunction(iface) && !callback) {
    callback = iface
    iface = ''
  }

  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      if (WINDOWS) {
        const error = new Error(NOT_SUPPORTED)

        if (callback) {
          callback(NOT_SUPPORTED)
        }

        reject(error)
      }

      defaultInterface = defaultInterface || getFirstExternalNetworkInterface()
      iface = iface || defaultInterface

      const result = {
        iface: iface,
        operstate: 'unknown',
        rx: 0,
        tx: 0,
        rx_sec: -1,
        tx_sec: -1,
        ms: 0
      }

      let cmd,
        rawOutput,
        stats,
        speed

      if (LINUX) {
        if (fs.existsSync('/sys/class/net/' + iface)) {
          cmd = `cat /sys/class/net/${iface}/operstate; ` +
            `cat /sys/class/net/${iface}/statistics/rx_bytes; ` +
            `cat /sys/class/net/${iface}/statistics/tx_bytes; `

          exec(cmd, (error, stdout) => {
            if (!error) {
              rawOutput = splitOutput(stdout)
              result.operstate = rawOutput[0].trim()
              result.rx = parseInt(rawOutput[1])
              result.tx = parseInt(rawOutput[2])

              speed = calcNetworkSpeed(iface, result.rx, result.tx)

              result.rx_sec = speed.rx_sec
              result.tx_sec = speed.tx_sec
              result.ms = speed.ms
            }

            if (callback) {
              callback(result)
            }

            resolve(result)
          })
        } else {
          if (callback) {
            callback(result)
          }

          resolve(result)
        }
      }

      if (DARWIN) {
        cmd = `ifconfig ${iface} | grep 'status'`

        exec(cmd, (error, stdout) => {
          result.operstate = (stdout.toString().split(':')[1] || '').trim()
          result.operstate = (result.operstate || '').toLowerCase()
          result.operstate = (result.operstate == 'active'
            ? 'up'
            : (result.operstate == 'inactive'
              ? 'down'
              : 'unknown')
            )

          cmd = 'netstat -bI ' + iface

          exec(cmd, (error, stdout) => {
            if (!error) {
              rawOutput = splitOutput(stdout)

              // if there is less than 2 lines, no information for this interface was found
              if (rawOutput.length > 1 && rawOutput[1].trim() !== '') {
                // skip header line
                // use the second line because it is tied to the NIC instead of the ipv4 or ipv6 address
                stats = rawOutput[1].replace(MATCH_SPACES, ' ').split(' ')
                result.rx = parseInt(stats[6])
                result.tx = parseInt(stats[9])

                speed = calcNetworkSpeed(iface, result.rx, result.tx)

                result.rx_sec = speed.rx_sec
                result.tx_sec = speed.tx_sec
              }
            }

            if (callback) {
              callback(result)
            }

            resolve(result)
          })
        })
      }
    })
  })
}
