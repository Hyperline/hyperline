import { exec as ex } from 'child_process';
import { iconStyles } from '../utils/icons'
import { colorExists } from '../utils/colors'
import pluginWrapperFactory from '../core/PluginWrapper'

function exec(command, options) {
  return new Promise((resolve, reject) => {
    ex(command, options, (err, stdout, stderr) => {
      err ? reject(err+'\n'+stderr) : resolve(stdout)
    })
  })
}

export function componentFactory(React, colors) {
  const PluginIcon = ({fillColor}) => (
    <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd">
        <g fill={fillColor} transform="translate(1.000000, 1.000000)">
          <g>
            <path d="m3.14817,9.43129c-0.41374,0 -0.78987,-0.33852 -0.78987,-0.75226s0.33852,-0.75226 0.78987,-0.75226s0.78987,0.33852 0.78987,0.75226s-0.37613,0.75226 -0.78987,0.75226zm9.70417,-4.09982c-0.07523,-0.60181 -0.45136,-1.09078 -0.94033,-1.46691l-0.18807,-0.15045l-0.15045,0.18807c-0.3009,0.33852 -0.41374,0.94033 -0.37613,1.39168c0.03761,0.33852 0.15045,0.67703 0.33852,0.94033c-0.15045,0.07523 -0.33852,0.15045 -0.48897,0.22568c-0.33852,0.11284 -0.67703,0.15045 -1.01555,0.15045l-9.74178,0l-0.03761,0.22568c-0.07523,0.71465 0.03761,1.46691 0.33852,2.14394l0.15045,0.26329l0,0.03761c0.90271,1.50452 2.52007,2.18156 4.28789,2.18156c3.38517,0 6.16854,-1.46691 7.485,-4.62641c0.8651,0.03761 1.7302,-0.18807 2.14394,-1.01555l0.11284,-0.18807l-0.18807,-0.11284c-0.48897,-0.3009 -1.166,-0.33852 -1.7302,-0.18807zm-4.85208,-0.60181l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm0,-1.84304l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm0,-1.88065l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm1.80543,3.72369l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-5.45389,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm1.84304,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-3.64847,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm3.64847,-1.84304l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691zm-1.84304,0l-1.46691,0l0,1.46691l1.46691,0l0,-1.46691z" />
          </g>
        </g>
      </g>
    </svg>
  )

  PluginIcon.propTypes = {
    fillColor: React.PropTypes.string
  }

  return class extends React.Component {
    static displayName() {
      return 'Docker plugin'
    }

    static propTypes() {
      return {
        options: React.PropTypes.object
      }
    }

    constructor(props) {
      super(props)

      this.state = {version: '?.?.?.?'}
      exec('/usr/local/bin/docker version -f {{.Server.Version}}')
        .then( version => {
          this.setState({version: version})
        })
    }

    componentDidMount() {
      this.interval = setInterval(() => (
        exec('/usr/local/bin/docker version -f {{.Server.Version}}')
        .then( version => {
          this.setState({version: version})
        })
        .catch(() => {
          this.setState({version: '?.?.?.?'})
        })
      ), 60000*5)
    }

    componentWillUnmount() {
      clearInterval(this.interval)
    }

    render() {
      const PluginWrapper = pluginWrapperFactory(React)
      const fillColor = colors[this.props.options.color]

      return (
        <PluginWrapper color={fillColor}>
          <PluginIcon fillColor={fillColor} /> {this.state.version}
        </PluginWrapper>
      )
    }
  }
}

export const validateOptions = options => {
  const errors = []

  if (!options.color) {
    errors.push('\'color\' color string is required but missing.')
  } else if (!colorExists(options.color)) {
    errors.push(`invalid color '${options.color}'`)
  }

  return errors
}

export const defaultOptions = {
  color: 'cyan'
}
