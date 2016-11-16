import { hyperlineFactory } from './lib/core/hyperline'
import { getColorList } from './lib/utils/colors'
import { getDefaultConfig, mergeConfigs } from './lib/utils/config'
import plugins from './lib/plugins'

function mapConfigToPluginProp(config) {
  return config.plugins.map(({name, options}) => ({
    componentFactory: plugins[name].componentFactory,
    options: options
  }))
}

export function reduceUI(state, {type, config}) {
  switch (type) {
  case 'CONFIG_LOAD':
  case 'CONFIG_RELOAD': {
    return state.set('hyperline', config.hyperline);
  }
  }

  return state;
}

export function mapHyperState({ui: { colors, fontFamily, hyperline }}, map) {
  return Object.assign({}, map, {
    colors,
    fontFamily,
    hyperline
  })
}

export function decorateHyper(Hyper, { React, notify }) {
  const { Component, PropTypes } = React
  const HyperLine = hyperlineFactory(React)

  return class extends Component {
    static displayName() {
      return 'Hyper'
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
      const mergedConfig = mergeConfigs(defaultConfig, props.hyperline, notify)

      this.plugins = mapConfigToPluginProp(mergedConfig)
    }

    render() {
      return <Hyper {...this.props} customChildren={(
        <HyperLine
          fontFamily={this.props.fontFamily}
          colors={this.colors}
          plugins={this.plugins}
          background={this.props.hyperline.background}
        />
      )} />
    }
  }
}
