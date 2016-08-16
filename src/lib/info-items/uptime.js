import os from 'os'

export function uptimeFactory( React ) {
  return class extends React.Component {
    constructor( props ) {
      super( props )
      this.state = {
        uptime: this.getUptime()
      }

      // Recheck every 5 minutes
      setInterval( () => this.getUptime(), 60000 * 5 )
    }

    getUptime() {
      const uptime = ( os.uptime() / 3600 ).toFixed( 0 )
      this.setState( { uptime } )

      return uptime
    }

    render() {
      return <div style={this.props.style}>{this.state.uptime}HRS</div>
    }
  }
}
