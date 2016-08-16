import os from 'os'

export function hostnameFactory( React ) {
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
      return <div style={this.props.style}>{os.hostname()}</div>
    }
  }
}
