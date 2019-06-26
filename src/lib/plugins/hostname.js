import os from 'os'
import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../utils/svg-icon'
import { writeSync as writeClipboard } from 'clipboardy'

function getUsername() {
    return process.env.USER;
}

function getHostname() {
    return os.hostname();
}

class PluginIcon extends Component {
  render() {

    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g
            className="hostname-icon"
            transform="translate(1.000000, 1.000000)"
          >
            <path d="M2,0 L12,0 L12,8 L2,8 L2,0 Z M4,2 L10,2 L10,6 L4,6 L4,2 Z M5.5,11 L8.5,11 L8.5,14 L5.5,14 L5.5,11 Z M11,11 L14,11 L14,14 L11,14 L11,11 Z M0,11 L3,11 L3,14 L0,14 L0,11 Z M6.5,10 L7.5,10 L7.5,11 L6.5,11 L6.5,10 Z M12,10 L13,10 L13,11 L12,11 L12,10 Z M1,10 L2,10 L2,11 L1,11 L1,10 Z M1,9 L13,9 L13,10 L1,10 L1,9 Z M6.5,8 L7.5,8 L7.5,9 L6.5,9 L6.5,8 Z" />
          </g>
        </g>

        <style jsx>{`
          .hostname-icon {
            fill: #fff;
          }
        `}</style>
      </SvgIcon>
    )
  }
}

export default class HostName extends Component {
  static displayName() {
    return 'hostname'
  }

  constructor(props) {
      super(props);
      this.copyHostname = this.copyHostname.bind(this);
  }

  copyHostname() {
      const hostname = getHostname()
      writeClipboard(hostname);
      this.props.notify('Hyperline', 'Copied "' + hostname + '" to your clipboard.')
  }

  render() {
    const hostname = getHostname()
    const username = getUsername()

    return (
      <div className="wrapper" onClick={this.copyHostname}>
        <PluginIcon /> <span>{username}@</span>
        {hostname}

        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
