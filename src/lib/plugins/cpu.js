import os from 'os'
import { iconStyles } from '../utils/icons'
import { colorExists } from '../utils/colors'
import { combineValidators, validateUpdateIntervalMs } from '../utils/validators'
import pluginWrapperFactory from '../core/PluginWrapper'

const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g fill={fillColor} transform="translate(1.000000, 1.000000)">
        <g>
          <path d="M3,3 L11,3 L11,11 L3,11 L3,3 Z M4,4 L10,4 L10,10 L4,10 L4,4 Z"></path>
          <rect x="5" y="5" width="4" height="4"></rect>
          <rect x="4" y="0" width="1" height="2"></rect>
          <rect x="6" y="0" width="1" height="2"></rect>
          <rect x="8" y="0" width="1" height="2"></rect>
          <rect x="5" y="12" width="1" height="2"></rect>
          <rect x="7" y="12" width="1" height="2"></rect>
          <rect x="9" y="12" width="1" height="2"></rect>
          <rect x="12" y="3" width="2" height="1"></rect>
          <rect x="12" y="5" width="2" height="1"></rect>
          <rect x="12" y="7" width="2" height="1"></rect>
          <rect x="12" y="9" width="2" height="1"></rect>
          <rect x="0" y="4" width="2" height="1"></rect>
          <rect x="0" y="4" width="2" height="1"></rect>
          <rect x="0" y="6" width="2" height="1"></rect>
          <rect x="0" y="8" width="2" height="1"></rect>
          <rect x="0" y="10" width="2" height="1"></rect>
        </g>
      </g>
    </g>
  </svg>
)

export function componentFactory( React, colors ) {
  return class extends React.Component {
    static displayName() {
      return 'CPU plugin'
    }

    static propTypes() {
      return {
        options: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)

      this.state = {
        cpuAverage: this.calculateCpuUsage(),
        idleCpu: false,
        totalCpu: false
      }

      setInterval(() => {
        this.setState({
          cpuAverage: this.calculateCpuUsage()
        })
      }, props.options.updateIntervalMs)
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

    getColor(cpuAverage) {
      const colors = this.props.options.colors

      if ( cpuAverage < 50 ) {
        return colors.low
      } else if ( cpuAverage < 75 ) {
        return colors.moderate
      } else {
        return colors.high
      }
    }

    render() {
      const avg = this.state.cpuAverage
      const PluginWrapper = pluginWrapperFactory(React)
      const fillColor = colors[this.getColor(this.state.cpuAverage)]

      return (
        <PluginWrapper color={fillColor}>
          {pluginIcon(React, fillColor)} {(avg < 10) && '0'} {avg}%
        </PluginWrapper>
      )
    }
  }
}

const validateColors = (options) => {
  const errors = []

  if (typeof options.colors === 'undefined') {
    errors.push('\'colors\' object is required but missing.')
  } else {
    if (!options.colors.high) {
      errors.push('\'colors.high\' color string is required but missing.')
    } else if (!colorExists(options.colors.high)) {
      errors.push(`invalid color '${options.colors.high}'`)
    }

    if (!options.colors.moderate) {
      errors.push('\'colors.moderate\' color string is required but missing.')
    } else if (!colorExists(options.colors.moderate)) {
      errors.push(`invalid color '${options.colors.moderate}'`)
    }

    if (!options.colors.low) {
      errors.push('\'colors.low\' color string is required but missing.')
    } else if (!colorExists(options.colors.low)) {
      errors.push(`invalid color '${options.colors.low}'`)
    }
  }

  return errors
}

export const validateOptions = combineValidators(
  [
    validateUpdateIntervalMs,
    validateColors
  ]
)

export const defaultOptions = {
  updateIntervalMs: 500,
  colors: {
    high: 'lightRed',
    moderate: 'lightYellow',
    low: 'lightGreen'
  }
}
