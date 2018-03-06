import os from 'os'
import React from 'react'
import Component from 'hyper/component'
import formatUptime from '../utils/time'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends Component {
  styles() {
    return {
      'uptime-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g
            className={css('uptime-icon')}
            transform="translate(1.000000, 1.000000)"
          >
            <g>
              <path d="M0,0 L14,0 L14,14 L0,14 L0,0 Z M1,1 L13,1 L13,13 L1,13 L1,1 Z" />
              <path d="M6,2 L7,2 L7,7 L6,7 L6,2 Z M6,7 L10,7 L10,8 L6,8 L6,7 Z" />
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Uptime extends Component {
  static displayName() {
    return 'uptime'
  }

  constructor(props) {
    super(props)

    this.state = {
      uptime: this.getUptime()
    }
  }

  componentDidMount() {
    const uptime = this.getUptime()
    // Recheck every 5 minutes
    setInterval(() => this.setState({ uptime }), 60000 * 5)
  }

  getUptime() {
    return formatUptime(os.uptime())
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
        <PluginIcon /> {this.state.uptime}
      </div>
    )
  }
}
