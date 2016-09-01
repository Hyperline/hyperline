import os from 'os'
import { iconStyles } from '../utils/icons'

const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
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

export function memoryFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Memory plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        freeMemory: this.calculateFreeMemory(),
        totalMemory: this.getMb(os.totalmem())
      }

      setInterval(() => this.calculateFreeMemory(), 100)
    }

    getMb(bytes) {
      return (bytes / (1024 * 1024)).toFixed(0) + 'MB'
    }

    calculateFreeMemory() {
      const freeMemory = this.getMb(os.freemem())
      this.setState({freeMemory})
      return freeMemory
    }

    render() {
      return (
        <div style={this.props.style}>
          {pluginIcon(React, this.props.style.color)} {this.state.freeMemory} / {this.state.totalMemory}
        </div>
      )
    }
  }
}
