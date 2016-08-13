import os from 'os'

const CPU_USAGE_COLORS = {
  HIGH: "#FF0000",
  MODERATE: "#F6FF00",
  LOW: "#15FF00"
}

function calculateFactory () {
  let _idleCpu;
  let _totalCpu;
  return function calculate () {
    let totalIdle = 0
    let totalTick = 0
    var cpus = os.cpus()

    for (var i = 0, len = cpus.length; i < len; i++) {
      const cpu = cpus[i]

      var type
      for (type in cpu.times) {
        totalTick += cpu.times[type]
      }

      totalIdle += cpu.times.idle
    }

    const idle = totalIdle / cpus.length
    const total = totalTick / cpus.length

    let rtn
    if (_idleCpu) {
      const idleDifference = idle - _idleCpu
      const totalDifference = total - _totalCpu
      rtn = 100 - ~~(100 * idleDifference / totalDifference)
    } else {
      rtn = 0
    }

    _idleCpu = idle
    _totalCpu = total

    return rtn
  }
}

function getCpuPercentage(child, calculate) {
  const cpuAvg = calculate()
  if (cpuAvg < 50) {
    child.style.color = CPU_USAGE_COLORS.LOW
  } else if (cpuAvg < 75){
    child.style.color = CPU_USAGE_COLORS.MODERATE
  } else {
    child.style.color = CPU_USAGE_COLORS.HIGH
  }

  return cpuAvg
}

export function render (child) {
  const calculate = calculateFactory()

  child.innerHTML = getCpuPercentage(child, calculate) + '%'

  setInterval(() => child.innerHTML = getCpuPercentage(child, calculate) + '%', 200)
}
