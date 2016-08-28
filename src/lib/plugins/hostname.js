import os from 'os'
import { drawIcon } from '../utils/icons'

export function hostnameFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Hostname plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    render() {
      return (
        <div style={this.props.style}>
          {drawIcon(React, 'hostname', this.props.style.color)} {os.hostname()}
        </div>
      )
    }
  }
}
