import os from 'os'

export function cpuFactory( React, colors ) {
  return class extends React.Component {
    static displayName() {
      return 'CPU plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor( props ) {
      super( props )

      this.state = {
        cpuAverage: this.getCpuAverage(),
        idleCpu: false,
        totalCpu: false
      }

      setInterval( () => this.getCpuAverage(), 500 )
    }

    calculate() {
      let totalIdle = 0,
        totalTick = 0,
        rtn
      const cpus = os.cpus(),
        idle = totalIdle / cpus.length,
        total = totalTick / cpus.length

      for ( let i = 0, len = cpus.length; i < len; i++ ) {
        const cpu = cpus[ i ]

        for ( let type in cpu.times ) {
          if ( cpu.times.hasOwnProperty( type ) ) {
            totalTick += cpu.times[ type ]
          }
        }

        totalIdle += cpu.times.idle
      }

      if ( this.state && this.state.idleCpu ) {
        const idleDifference = idle - this.state.idleCpu,
          totalDifference = total - this.state.totalCpu
        rtn = 100 - ~~( 100 * idleDifference / totalDifference )
      } else {
        rtn = 0
      }

      this.setState( {
        idleCpu: idle,
        totalCpu: total
      } )

      return rtn
    }

    getCpuAverage() {
      const cpuAverage = this.calculate()
      this.setState( { cpuAverage } )

      return cpuAverage
    }

    getColor( cpuAverage ) {
      const CPU_USAGE_COLORS = {
        HIGH: colors.lightRed,
        MODERATE: colors.lightYellow,
        LOW: colors.lightGreen
      }

      if ( cpuAverage < 50 ) {
        return CPU_USAGE_COLORS.LOW
      } else if ( cpuAverage < 75 ) {
        return CPU_USAGE_COLORS.MODERATE
      }

      return CPU_USAGE_COLORS.HIGH
    }

    getStyle() {
      return Object.assign( {}, this.props.style, {
        color: this.getColor( this.state.cpuAverage )
      } )
    }

    render() {
      return (
        <div style={this.getStyle()}>
          {this.state.cpuAverage}%
        </div>
      )
    }
  }
}
