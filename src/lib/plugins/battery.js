import { iconStyles } from '../utils/icons'
import { colorExists } from '../utils/colors'
import pluginWrapperFactory from '../core/PluginWrapper'


const pluginIcon = (React, state, fillColor) => {
  const calcCharge = percent => {
    const base = 3.5,
      val = Math.round((100 - percent) / 4.5),
      point = base + (val / 2)

    return val > 0 ? `M5,3 L11,3 L11,${point} L5,${point} L5,3 Z` : ''
  }

  const states = {
    CHARGING: (
      <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <g fill={fillColor}>
            <path d="M9,10 L10,10 L10,9 L6,9 L6,10 L7,10 L7,13 L9,13 L9,10 Z M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,6 L11,6 L11,7 L5,7 L5,6 Z M5,7 L11,7 L11,8 L5,8 L5,7 Z M5,8 L11,8 L11,9 L5,9 L5,8 Z M9,4 L10,4 L10,6 L9,6 L9,4 Z M6,4 L7,4 L7,6 L6,6 L6,4 Z"></path>
          </g>
        </g>
      </svg>
    ),
    DISCHARGING: (
      <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <g fill={fillColor}>
            <path d={`M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z ${calcCharge(state.percent)}`}></path>
          </g>
        </g>
      </svg>
    ),
    CRITICAL: (
      <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
        <g fillRule="evenodd">
          <g fill={fillColor}>
            <path d="M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,3 L11,3 L11,11 L5,11 L5,3 Z"></path>
          </g>
        </g>
      </svg>
    ),
  }

  if ( state.percent <= 20 && !state.ischarging ) {
    return states.CRITICAL
  } else if ( !state.ischarging ) {
    return states.DISCHARGING
  }

  return states.CHARGING
}

export function componentFactory(React, colors ) {
  return class extends React.Component {
    static displayName() {
      return 'Battery plugin'
    }

    static propTypes() {
      return {
        options: React.PropTypes.object
      }
    }

    constructor( props ) {
      super(props )

      this.state = {
        ischargin: false,
        percent: '--'
      }

      this.getBattery()
    }

    getBattery() {
      navigator.getBattery().then(battery => {
        this.setBatteryStatus(battery)

        const batteryStatus = this.setBatteryStatus.bind(this);
        const events = [ 'chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange' ]
        events.forEach(event => {
          battery.addEventListener(event, event => batteryStatus(event.target), false)
        })
      })
    }

    setBatteryStatus(battery) {
      this.setState(Object.assign({}, {
        ischarging: battery.charging,
        percent: Math.floor(battery.level * 100)
      }))
    }

    getColor( batteryState ) {
      const colors = this.props.options.colors

      if ( batteryState.percent <= 20 && !batteryState.ischarging ) {
        return colors.critical
      }

      return colors.fine
    }

    render() {
      const PluginWrapper = pluginWrapperFactory(React)
      const fillColor = colors[this.getColor(this.state)]

      return (
          <PluginWrapper color={fillColor}>
            {pluginIcon(React, this.state, fillColor)} {this.state.percent}%
          </PluginWrapper>
      )
    }
  }
}

export const validateOptions = (options) => {
  const errors = []

  if (!options.colors) {
    errors.push('\'colors\' object is required but missing.')
  } else {
    if (!options.colors.fine) {
      errors.push('\'colors.fine\' color string is required but missing.')
    } else if (!colorExists(options.colors.fine)) {
      errors.push(`invalid color '${options.colors.fine}'`)
    }

    if (!options.colors.critical) {
      errors.push('\'colors.critical\' color string is required but missing.')
    } else if (!colorExists(options.colors.critical)) {
      errors.push(`invalid color '${options.colors.critical}'`)
    }
  }

  return errors
}

export const defaultOptions = {
  colors: {
    fine: 'lightGreen',
    critical: 'lightRed'
  }
}
