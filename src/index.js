import { hyperlineFactory } from './lib/core/hyperline'
import { getColorList } from './lib/utils/colors'
import defaultConfig from './lib/utils/defaultConfig'
import plugins from './lib/plugins'

export function mapHyperTermState(state, map) {
  return Object.assign({}, map, {
    colors: state.ui.colors,
    fontFamily: state.ui.fontFamily
  })
}

function mapConfigToPluginProp(config) {
  return config.plugins.map((each) => {
    return {
      componentFactory: plugins[each.name].componentFactory,
      options: each.options
    }
  })
}

export function decorateHyperTerm(HyperTerm, {React}) {
  const HyperLine = hyperlineFactory(React)

  return class extends React.Component {
    static displayName() {
      return 'HyperTerm'
    }

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

      const config = window.config.getConfig().hyperline
      this.plugins = mapConfigToPluginProp(config ? config : defaultConfig)
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
