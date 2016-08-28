import os from 'os'
import { drawIcon } from '../utils/icons'

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
          {drawIcon(React, 'uptime', this.props.style.color)} {this.state.uptime}HRS
        </div>
      )
    }
  }
}
