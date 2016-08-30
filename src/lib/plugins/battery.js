import child_process from 'child_process'

// global system command for battery
// is defined for each operating system.
let cmdBattery = ''

export function batteryFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Battery plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)

      this.state = {
        battery: this.getBattery()
      }

      // Recheck every 2 minutes
      setInterval(() => this.getBattery(), 60000 * 2)
    }

    getBattery() {
      if (process.platform === 'darwin') {
        // terminal command for mac os
        cmdBattery = 'pmset -g batt | egrep "([0-9]+\%).*" -o'
        child_process.exec(cmdBattery, (error, stdout) => {
          if (error) {
            throw error
          }
          const batteryArray = stdout.trim().split(';')
          let batteryLevel = `🔋 ${batteryArray[0]}`

          this.setState({batteryLevel})

          return batteryLevel
        })
      } else if (process.platform === 'linux') {
        // terminal command for linux
        // cmdBattery = 'add linux command'
        let batteryLevel = '🔋 😔'

        this.setState({batteryLevel})

        return batteryLevel
      } else if (process.platform === 'win32') {
        // terminal command for windows
        // cmdBattery = 'add windows command'
        let batteryLevel = '🔋 😔'

        this.setState({batteryLevel})

        return batteryLevel
      } else {
        // unsupported OS
        let batteryLevel = '🔋 😔'

        this.setState({batteryLevel})

        return batteryLevel
      }
    }

    render() {
      return (
        <div style={this.props.style}>
          {this.state.batteryLevel}
        </div>
      )
    }
  }
}
