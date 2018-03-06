import { exec as ex } from 'child_process'
import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends Component {
  styles() {
    return {
      'network-icon': {
        fill: '#73abff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g fill="none" fillRule="evenodd">
            <g
              className={css('network-icon')}
              transform="translate(1.000000, 1.000000)"
            >
              <g>
                <path d="m3.14817,9.43129c-0.41374,0 -0.78987,-0.33852 -0.78987,-0.75226s0.33852,-0.75226 0.78987,-0.75226s0.78987,0.33852 0.78987,0.75226s-0.37613,0.75226 -0.78987,0.75226zm9.70417,-4.09982c-0.07523,-0.60181 -0.45136,-1.09078 -0.94033,-1.46691l-0.18807,-0.15045l-0.15045,0.18807c-0.3009,0.33852 -0.41374,0.94033 -0.37613,1.39168c0.03761,0.33852 0.15045,0.67703 0.33852,0.94033c-0.15045,0.07523 -0.33852,0.15045 -0.48897,0.22568c-0.33852,0.11284 -0.67703,0.15045 -1.01555,0.15045l-9.74178,0l-0.03761,0.22568c-0.07523,0.71465 0.03761,1.46691 0.33852,2.14394l0.15045,0.26329l0,0.03761c0.90271,1.50452 2.52007,2.18156 4.28789,2.18156c3.38517,0 6.16854,-1.46691 7.485,-4.62641c0.8651,0.03761 1.7302,-0.18807 2.14394,-1.01555l0.11284,-0.18807l-0.18807,-0.11284c-0.48897,-0.3009 -1.166,-0.33852 -1.7302,-0.18807zm-4.85208,-0.60181l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm0,-1.84304l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm0,-1.88065l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm1.80543,3.72369l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-5.45389,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm1.84304,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-3.64847,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm3.64847,-1.84304l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-1.84304,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691z" />
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Docker extends Component {
  static displayName() {
    return 'docker'
  }

  constructor(props) {
    super(props)

    this.state = { version: 'Not running' }
    this.setVersion = this.setVersion.bind(this)
  }

  setVersion() {
    exec('/usr/local/bin/docker version -f {{.Server.Version}}')
      .then(version => {
        this.setState({ version })
      })
      .catch(() => {
        this.setState({ version: 'Not running' })
      })
  }

  componentDidMount() {
    this.setVersion()
    this.interval = setInterval(() => this.setVersion(), 15000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: '#73abff'
      }
    }
  }

  template(css) {
    return (
      <div className={css('wrapper')}>
        <PluginIcon /> {this.state.version}
      </div>
    )
  }
}

function exec(command, options) {
  return new Promise((resolve, reject) => {
    ex(command, options, (err, stdout, stderr) => {
      if (err) {
        reject(`${err}\n${stderr}`)
      } else {
        resolve(stdout)
      }
    })
  })
}
