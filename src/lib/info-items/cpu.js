import os from "os"

const CPU_USAGE_COLORS = {
  HIGH: "#FF0000",
  MODERATE: "#F6FF00",
  LOW: "#15FF00"
}

module.exports = {
  calculate: function() {
    var totalIdle = 0, totalTick = 0
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

    var rtn = ""
    if (this._idleCpu) {
      const idleDifference = idle - this._idleCpu
      const totalDifference = total - this._totalCpu
      rtn = 100 - ~~(100 * idleDifference / totalDifference)
    } else {
      rtn = 0
    }

    this._idleCpu = idle
    this._totalCpu = total

    return rtn
  },

  get: function() {
    return this.calculate() + "%"
  },

  render: function(ctx, pos) {
    const cpuAvg = this.calculate()
    if (cpuAvg < 50) {
      ctx.fillStyle = CPU_USAGE_COLORS.LOW
    } else if (cpuAvg < 75){
      ctx.fillStyle = CPU_USAGE_COLORS.MODERATE
    } else {
      ctx.fillStyle = CPU_USAGE_COLORS.HIGH
    }

    const toPrint = cpuAvg + "%"

    ctx.fillText(toPrint, pos.x, pos.y)
    return ctx.measureText(toPrint).width
  }
}
