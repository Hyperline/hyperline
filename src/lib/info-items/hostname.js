import os from "os"

export function hostnameFactory (React) {
  return class extends React.Component {
    render () {
      return <div style={this.props.style}>{os.hostname()}</div>
    }
  }
}
