import hostname from './hostname'
import ip from './ip'
import memory from './memory'
import uptime from './uptime'
import cpu from './cpu'
import network from './network'
import battery from './battery'
import time from './time'
import docker from './docker'
import spotify from './spotify'
// import gitStatus from './git-status'

export const defaultPlugins = [hostname, ip, memory, battery, cpu, network, spotify]
export const allPlugins = [hostname, ip, memory, battery, cpu, network, spotify, time, uptime, docker]
