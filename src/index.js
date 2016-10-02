import { hyperlineFactory } from './lib/core/hyperline'
import { getColorList } from './lib/utils/colors'
import { getDefaultConfig, mergeConfigs } from './lib/utils/config'
import plugins from './lib/plugins'

function mapConfigToPluginProp(config) {
  return config.plugins.map((each) => {
    return {
      componentFactory: plugins[each.name].componentFactory,
      options: each.options
    }
  })
}

export function reduceUI(state, action) {
  switch (action.type) {
  case 'CONFIG_LOAD':
  case 'CONFIG_RELOAD': {
    return state.set('hyperline', action.config.hyperline);
  }
  }

  return state;
}

export function mapHyperTermState(state, map) {
  return Object.assign({}, map, {
    colors: state.ui.colors,
    fontFamily: state.ui.fontFamily,
    hyperline: state.ui.hyperline
  })
}

export function decorateHyperTerm(HyperTerm, {React, notify}) {
  const { Component, PropTypes } = React
  const HyperLine = hyperlineFactory(React)

  return class extends Component {
    static displayName() {
      return 'HyperTerm'
    }

    static propTypes() {
      return {
        colors: PropTypes.oneOfType([
          PropTypes.object,
          PropTypes.array
        ]),
        fontFamily: PropTypes.string,
        style: PropTypes.object,
        hyperline: PropTypes.object
      }
    }

    constructor(props, context) {
      super(props, context)
      this.colors = getColorList(props.colors)

      const defaultConfig = getDefaultConfig(plugins)
      const mergedConfig = mergeConfigs(defaultConfig, this.props.hyperline, notify)

      this.plugins = mapConfigToPluginProp(mergedConfig)
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
