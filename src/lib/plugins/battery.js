import {iconStyles} from '../utils/icons'
import pluginWrapperFactory from '../core/PluginWrapper'

const pluginIcon = (React, state, fillColor) => {
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
            <path d="M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,3 L11,3 L11,7 L5,7 L5,3 Z"></path>
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

export function batteryFactory(React, colors ) {
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
