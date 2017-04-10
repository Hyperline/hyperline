import os from 'os'
import { formatUptime } from '../utils/time'
import { iconStyles } from '../utils/icons'
import pluginWrapperFactory from '../core/PluginWrapper'
import { colorExists } from '../utils/colors'

const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g fill={fillColor} transform="translate(1.000000, 1.000000)">
        <g>
          <path d="M0,0 L14,0 L14,14 L0,14 L0,0 Z M1,1 L13,1 L13,13 L1,13 L1,1 Z"></path>
          <path d="M6,2 L7,2 L7,7 L6,7 L6,2 Z M6,7 L10,7 L10,8 L6,8 L6,7 Z"></path>
        </g>
      </g>
    </g>
  </svg>
)

export function componentFactory(React, colors) {
  const {Component, PropTypes} = React
  return class extends Component {
    static displayName() {
      return 'Uptime plugin'
    }

    static propTypes() {
      return {
        options: PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        uptime: this.getUptime()
      }
    }

    componentDidMount() {
      // Recheck every 5 minutes
      this.interval = setInterval(() => ({
        uptime: this.setState(this.getUptime())
      }), 60000 * 5)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }

    getUptime() {
      return formatUptime(os.uptime())
    }

    render() {
      const PluginWrapper = pluginWrapperFactory(React)
      const fillColor = colors[this.props.options.color]

      return (
        <PluginWrapper color={fillColor}>
          {pluginIcon(React, fillColor)} {this.state.uptime}
        </PluginWrapper>
      )
    }
  }
}

export const validateOptions = (options) => {
  const errors = []

  if (!options.color) {
    errors.push('\'color\' color string is required but missing.')
  } else if (!colorExists(options.color)) {
    errors.push(`invalid color '${options.color}'`)
  }

  return errors
}

export const defaultOptions = {
  color: 'lightYellow'
}
