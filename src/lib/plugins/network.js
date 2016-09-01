import { networkStats } from 'systeminformation'

export function networkSpeedFactory(React) {
  return class extends React.Component {
    static displayName() {
      return 'Network Speed plugin'
    }

    static propTypes() {
      return {
        style: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)
      this.state = {
        download: 0,
        upload: 0
      }

      this.getSpeed()

      setInterval(() => this.getSpeed(), 500);
    }

    getSpeed() {
      networkStats().then(data => this.setState(this.buildStateObject(data)))
    }

    buildStateObject(data) {
      return Object.assign({}, {
        download: (data.rx_sec / 1024).toFixed(),
        upload: (data.tx_sec / 1024).toFixed()
      })
    }

    render() {
      return (
        <div style={this.props.style}>
          {this.state.download}kB/s {this.state.upload}kB/s
        </div>
      )
    }
  }
}
