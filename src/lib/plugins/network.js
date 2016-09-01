import { networkStats } from 'systeminformation'
import { iconStyles } from '../utils/icons'


const pluginIcon = (React, fillColor) => (
  <svg style={iconStyles} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <g fill={fillColor} transform="translate(1.000000, 1.000000)">
        <g>
          <path d="M0,10 L7,10 L7,11 L0,11 L0,10 Z M1,11 L6,11 L6,12 L1,12 L1,11 Z M2,12 L5,12 L5,13 L2,13 L2,12 Z M3,13 L4,13 L4,14 L3,14 L3,13 Z M2,3 L5,3 L5,10 L2,10 L2,3 Z"></path>
          <path d="M8,2 L13,2 L13,3 L8,3 L8,2 Z M9,1 L12,1 L12,2 L9,2 L9,1 Z M10,0 L11,0 L11,1 L10,1 L10,0 Z M7,3 L14,3 L14,4 L7,4 L7,3 Z M9,4 L12,4 L12,11 L9,11 L9,4 Z"></path>
        </g>
      </g>
    </g>
  </svg>
)

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
      let rawDownload = data.rx_sec / 1024
      if (rawDownload < 0) {
        rawDownload = 0
      }

      let rawUpload = data.tx_sec / 1024
      if (rawUpload < 0) {
        rawUpload = 0
      }

      return Object.assign({}, {
        download: rawDownload.toFixed(),
        upload: rawUpload.toFixed()
      })
    }

    render() {
      return (
        <div style={this.props.style}>
          {pluginIcon(React, this.props.style.color)} {this.state.download}kB/s {this.state.upload}kB/s
        </div>
      )
    }
  }
}
