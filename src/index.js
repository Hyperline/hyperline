import {hyperlineFactory} from './lib/core/hyperline'
import {getColorList} from './lib/utils/colors'
import {hostnameFactory} from './lib/plugins/hostname'
import {memoryFactory} from './lib/plugins/memory'
import {uptimeFactory} from './lib/plugins/uptime'
import {cpuFactory} from './lib/plugins/cpu'
import {networkSpeedFactory} from './lib/plugins/network'

export function mapHyperTermState(state, map) {
  return Object.assign({}, map, {
    colors: state.ui.colors,
    fontFamily: state.ui.fontFamily
  })
}

export function decorateHyperTerm(HyperTerm, {React}) {
  const HyperLine = hyperlineFactory(React)

  return class extends React.Component {
    static propTypes() {
      return {
        colors: React.PropTypes.oneOfType([
          React.PropTypes.object,
          React.PropTypes.array
        ]),
        fontFamily: React.PropTypes.string,
        style: React.PropTypes.object
      }
    }

    constructor(props, context) {
      super(props, context)

      this.colors = getColorList(this.props.colors)
      this.plugins = [
        {
          componentFactory: hostnameFactory,
          color: this.colors.blue
        },
        {
          componentFactory: memoryFactory,
          color: this.colors.white
        },
        {
          componentFactory: uptimeFactory,
          color: this.colors.yellow
        },
        {
          componentFactory: cpuFactory,
          color: 'transparent'
        },
        {
          componentFactory: networkSpeedFactory,
          color: this.colors.red
        }
      ]
    }

    render() {
      return <HyperTerm {...this.props} customChildren={(
        <HyperLine
          fontFamily={this.props.fontFamily}
          colors={this.colors}
          plugins={this.plugins}
        />
      )} />
    }
  }
}
