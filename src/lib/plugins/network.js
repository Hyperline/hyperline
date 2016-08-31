import {networkStats} from '../utils/system-info'

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
      this.state = {}

      networkStats()
        .then(data => {
          this.setState(this.buildStateObject(data))
        })

      setInterval(() => {
        networkStats()
          .then(data => this.setState(this.buildStateObject(data)))
      }, 1000);
    }

    buildStateObject(data) {
      return Object.assign({},
        {
          iface: data.iface,
          ms: data.ms,
          operstate: data.operstate,
          rx: data.rx.toFixed(),
          rx_sec: (data.rx_sec / 1024).toFixed(),
          tx: data.tx.toFixed(),
          tx_sec: (data.tx_sec / 1024).toFixed()
        }
      )
    }

    render() {
      return (
        <div style={this.props.style}>
          {this.state.rx_sec}kB/s {this.state.tx_sec}kB/s
        </div>
      )
    }
  }
}
