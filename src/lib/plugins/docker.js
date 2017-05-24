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
  const PluginIcon = () => (
    <svg style={iconStyles} xmlns="http://www.w3.org/2000/svg">
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
          🐳 {this.state.version}
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
