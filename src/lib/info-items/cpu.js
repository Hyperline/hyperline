import os from 'os'

export function cpuFactory (React) {
  return class extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        cpuAverage: this.getCpuAverage(),
        idleCpu   : false,
        totalCpu  : false
      }

      setInterval(() => this.getCpuAverage(), 500)
    }

    calculate () {
      let totalIdle = 0
      let totalTick = 0
      const cpus = os.cpus()

      for (let i = 0, len = cpus.length; i < len; i++) {
        const cpu = cpus[i]

        for (let type in cpu.times) {
          if (cpu.times.hasOwnProperty(type)) {
            totalTick += cpu.times[type]
          }
        }

        totalIdle += cpu.times.idle
      }

      const idle = totalIdle / cpus.length
      const total = totalTick / cpus.length

      let rtn
      if (this.state && this.state.idleCpu) {
        const idleDifference = idle - this.state.idleCpu
        const totalDifference = total - this.state.totalCpu
        rtn = 100 - ~~(100 * idleDifference / totalDifference)
      } else {
        rtn = 0
      }

      this.setState({
        idleCpu : idle,
        totalCpu: total
      })

      return rtn
    }

    getCpuAverage () {
      const cpuAverage = this.calculate()
      this.setState({ cpuAverage })

      return cpuAverage
    }

    getColor (cpuAverage) {
      const CPU_USAGE_COLORS = {
        HIGH    : "#FF0000",
        MODERATE: "#F6FF00",
        LOW     : "#15FF00"
      }

      if (cpuAverage < 50) {
        return CPU_USAGE_COLORS.LOW
      } else if (cpuAverage < 75) {
        return CPU_USAGE_COLORS.MODERATE
      }

      return CPU_USAGE_COLORS.HIGH
    }

    getStyle () {
      return Object.assign({}, this.props.style, {
        color: this.getColor(this.state.cpuAverage)
      })
    }

    render () {
      return (
        <div style={this.getStyle()}>
          {this.state.cpuAverage}%
        </div>
      )
    }
  }
}
