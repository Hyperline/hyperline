import os from 'os'
import { iconStyles } from '../utils/icons'
import { colorExists } from '../utils/colors'
import pluginWrapperFactory from '../core/PluginWrapper'

const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g fill={fillColor}>
        <g id="memory" transform="translate(1.000000, 1.000000)">
          <path d="M3,0 L11,0 L11,14 L3,14 L3,0 Z M4,1 L10,1 L10,13 L4,13 L4,1 Z"></path>
          <rect x="5" y="2" width="4" height="10"></rect>
          <rect x="12" y="1" width="2" height="1"></rect>
          <rect x="12" y="3" width="2" height="1"></rect>
          <rect x="12" y="5" width="2" height="1"></rect>
          <rect x="12" y="9" width="2" height="1"></rect>
          <rect x="12" y="7" width="2" height="1"></rect>
          <rect x="12" y="11" width="2" height="1"></rect>
          <rect x="0" y="1" width="2" height="1"></rect>
          <rect x="0" y="3" width="2" height="1"></rect>
          <rect x="0" y="5" width="2" height="1"></rect>
          <rect x="0" y="9" width="2" height="1"></rect>
          <rect x="0" y="7" width="2" height="1"></rect>
          <rect x="0" y="11" width="2" height="1"></rect>
        </g>
      </g>
    </g>
  </svg>
)

export function componentFactory(React, colors) {
  return class extends React.Component {
    static displayName() {
      return 'Memory plugin'
    }

    static propTypes() {
      return {
        options: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        freeMemory: this.calculateFreeMemory(),
        totalMemory: this.getMb(os.totalmem())
      }
    }

    componentDidMount() {
      setInterval(() => this.setState({freeMemory: this.calculateFreeMemory()}), 100)
    }

    getMb(bytes) {
      return (bytes / (1024 * 1024)).toFixed(0) + 'MB'
    }

    calculateFreeMemory() {
      const freeMemory = this.getMb(os.freemem())
      return freeMemory
    }

    render() {
      const PluginWrapper = pluginWrapperFactory(React)
      const fillColor = colors[this.props.options.color]

      return (
        <PluginWrapper color={fillColor}>
          {pluginIcon(React, fillColor)} {this.state.freeMemory} / {this.state.totalMemory}
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
  color: 'white'
}
