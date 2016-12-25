import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../utils/SvgIcon'
import { currentLoad as cpuLoad } from 'systeminformation'
import leftPad from 'left-pad'

class PluginIcon extends Component {
  styles() {
    return {
      'cpu-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
      <g fill="none" fillRule="evenodd">
      <g className={css('cpu-icon')} transform="translate(1.000000, 1.000000)">
        <g>
          <path d="M3,3 L11,3 L11,11 L3,11 L3,3 Z M4,4 L10,4 L10,10 L4,10 L4,4 Z"></path>
          <rect x="5" y="5" width="4" height="4"></rect>
          <rect x="4" y="0" width="1" height="2"></rect>
          <rect x="6" y="0" width="1" height="2"></rect>
          <rect x="8" y="0" width="1" height="2"></rect>
          <rect x="5" y="12" width="1" height="2"></rect>
          <rect x="7" y="12" width="1" height="2"></rect>
          <rect x="9" y="12" width="1" height="2"></rect>
          <rect x="12" y="3" width="2" height="1"></rect>
          <rect x="12" y="5" width="2" height="1"></rect>
          <rect x="12" y="7" width="2" height="1"></rect>
          <rect x="12" y="9" width="2" height="1"></rect>
          <rect x="0" y="4" width="2" height="1"></rect>
          <rect x="0" y="4" width="2" height="1"></rect>
          <rect x="0" y="6" width="2" height="1"></rect>
          <rect x="0" y="8" width="2" height="1"></rect>
          <rect x="0" y="10" width="2" height="1"></rect>
        </g>
      </g>
    </g>
      </SvgIcon>
    )
  }
}

export default class Cpu extends Component {
  static displayName() {
    return 'CPU plugin'
  }

  constructor(props) {
    super(props)

    this.state = {
      cpuLoad: 0
    }
  }

  getCpuLoad() {
    cpuLoad().then(({ currentload }) => this.setState({
      cpuLoad: leftPad(currentload.toFixed(), 3, 0)
    }))
  }

  componentDidMount() {
    this.getCpuLoad()
    this.interval = setInterval(() => this.getCpuLoad(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }

  template(css) {
    return (
      <div className={css('wrapper')}>
        <PluginIcon /> {this.state.cpuLoad}%
      </div>
    )
  }
}
