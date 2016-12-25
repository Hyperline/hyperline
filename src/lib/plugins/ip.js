import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../utils/SvgIcon'
import publicIp from 'public-ip'

function getIp() {
  return new Promise(resolve => {
    publicIp.v4()
      .then(ip => resolve(ip))
      .catch(() => resolve('?.?.?.?'))
  })
}

class PluginIcon extends Component {
  styles() {
    return {
      'ip-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className={css('ip-icon')} transform="translate(1.000000, 1.000000)">
            <path d="M9,9 L8,9 C8.55,9 9,8.55 9,8 L9,7 C9,6.45 8.55,6 8,6 L7,6 C6.45,6 6,6.45 6,7 L6,8 C6,8.55 6.45,9 7,9 L6,9 C5.45,9 5,9.45 5,10 L5,12 L6,12 L6,15 C6,15.55 6.45,16 7,16 L8,16 C8.55,16 9,15.55 9,15 L9,12 L10,12 L10,10 C10,9.45 9.55,9 9,9 L9,9 Z M7,7 L8,7 L8,8 L7,8 L7,7 L7,7 Z M9,11 L8,11 L8,15 L7,15 L7,11 L6,11 L6,10 L9,10 L9,11 L9,11 Z M11.09,7.5 C11.09,5.52 9.48,3.91 7.5,3.91 C5.52,3.91 3.91,5.52 3.91,7.5 C3.91,7.78 3.94,8.05 4,8.31 L4,10.29 C3.39,9.52 3,8.56 3,7.49 C3,5.01 5.02,2.99 7.5,2.99 C9.98,2.99 12,5.01 12,7.49 C12,8.55 11.61,9.52 11,10.29 L11,8.31 C11.06,8.04 11.09,7.78 11.09,7.5 L11.09,7.5 Z M15,7.5 C15,10.38 13.37,12.88 11,14.13 L11,13.08 C12.86,11.92 14.09,9.86 14.09,7.5 C14.09,3.86 11.14,0.91 7.5,0.91 C3.86,0.91 0.91,3.86 0.91,7.5 C0.91,9.86 2.14,11.92 4,13.08 L4,14.13 C1.63,12.88 0,10.38 0,7.5 C0,3.36 3.36,0 7.5,0 C11.64,0 15,3.36 15,7.5 L15,7.5 Z" id="Shape"></path>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Ip extends Component {
  static displayName() {
    return 'IP Address plugin'
  }

  constructor(props) {
    super(props)

    this.state = {
      ip: '?.?.?.?'
    }

    this.setIp = this.setIp.bind(this)
  }

  setIp() {
    getIp().then(ip => this.setState({ ip }))
  }

  componentDidMount() {
    // Every 5 seconds
    this.setIp()
    this.interval = setInterval(() => this.setIp(), 60000 * 5)
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
        <PluginIcon /> {this.state.ip}
      </div>
    )
  }
}
