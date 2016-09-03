import { hyperlineFactory } from './lib/core/hyperline'
import { getColorList, colorExists } from './lib/utils/colors'
import plugins from './lib/plugins'

export function mapHyperTermState(state, map) {
  return Object.assign({}, map, {
    colors: state.ui.colors,
    fontFamily: state.ui.fontFamily
  })
}

function getDefaultConfig(plugins) {
  let config = {
    color: 'black',
    plugins: []
  }

  Object.keys(plugins).forEach((pluginName) => {
    const pluginExports = plugins[pluginName]

    config.plugins.push({
      name: pluginName,
      options: pluginExports.defaultOptions
    })
  })

  return config
}

function getUserConfig() {
  return window.config.getConfig().hyperline
}

function mergeConfigs(defaultConfig, userConfig) {
  if (userConfig === undefined) {
    return defaultConfig
  }

  return {
    color: mergeColorConfigs(defaultConfig.color, userConfig.color),
    plugins: mergePluginConfigs(defaultConfig.plugins, userConfig.plugins)
  }
}

function mergeColorConfigs(defaultColor, userColor) {
  if (!userColor || !colorExists(userColor)) {
    return defaultColor
  } else {
    return userColor
  }
}

function mergePluginConfigs(defaultPlugins, userPlugins) {
  if (!userPlugins) {
    return defaultPlugins
  }

  const plugins = []

  userPlugins.forEach(eachPlugin => {
    const defaultPlugin
      = getPluginFromListByName(defaultPlugins, eachPlugin.name)

    // name doesn't exist
    if (!defaultPlugin) {
      console.log(`Plugin with name "${eachPlugin.name}" does not exist.`)
    } else {
      plugins.push(eachPlugin)
    }
  })

  return plugins
}

function getPluginFromListByName(pluginList, name) {
  return pluginList.find(each => each.name === name)
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

      const defaultConfig = getDefaultConfig(plugins)
      const userConfig = getUserConfig()
      const mergedConfig = mergeConfigs(defaultConfig, userConfig)

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
