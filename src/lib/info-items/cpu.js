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
        cpuAverage: this.calculateCpuUsage(),
        idleCpu: false,
        totalCpu: false
      }

      setInterval( () => {
        this.setState( {
          cpuAverage: this.calculateCpuUsage()
        } )
      }, 500 )
    }

    calculateCpuUsage() {
      let totalIdle = 0,
        totalTick = 0,
        idle,
        total,
        averageCpuUsage

      const cpus = os.cpus()

      for ( let i = 0, len = cpus.length; i < len; i++ ) {
        const cpu = cpus[ i ]

        for ( let type in cpu.times ) {
          if ( cpu.times.hasOwnProperty( type ) ) {
            totalTick += cpu.times[ type ]
          }
        }

        totalIdle += cpu.times.idle
      }

      idle = totalIdle / cpus.length
      total = totalTick / cpus.length

      if ( this.state && this.state.idleCpu ) {
        const idleDifference = idle - this.state.idleCpu,
          totalDifference = total - this.state.totalCpu
        averageCpuUsage = 100 - ~~( 100 * idleDifference / totalDifference )
      } else {
        averageCpuUsage = 0
      }

      this.setState( {
        idleCpu: idle,
        totalCpu: total
      } )

      return averageCpuUsage
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
