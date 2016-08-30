import os from 'os'
import { iconStyles } from '../utils/icons'

const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
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

export function uptimeFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Uptime plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        uptime: this.getUptime()
      }

      // Recheck every 5 minutes
      setInterval(() => this.getUptime(), 60000 * 5)
    }

    getUptime() {
      const uptime = (os.uptime()/3600).toFixed(0)
      this.setState({uptime})

      return uptime
    }

    render() {
      return (
        <div style={this.props.style}>
          {pluginIcon(React, this.props.style.color)} {this.state.uptime}HRS
        </div>
      )
    }
  }
}
