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

function mergeConfigs(defaultConfig, userConfig, notify) {
  if (userConfig === undefined) {
    return defaultConfig
  }

  return {
    color: mergeColorConfigs(defaultConfig.color, userConfig.color),
    plugins: mergePluginConfigs(defaultConfig.plugins, userConfig.plugins, notify)
  }
}

function mergeColorConfigs(defaultColor, userColor) {
  if (!userColor || !colorExists(userColor)) {
    return defaultColor
  } else {
    return userColor
  }
}

function mergePluginConfigs(defaultPlugins, userPlugins, notify) {
  if (!userPlugins) {
    return defaultPlugins
  }

  const finalOptions = []

  userPlugins.forEach(eachPlugin => {
    if (typeof eachPlugin !== 'object') {
      notify('HyperLine', '\'plugins\' array members in \'.hyperterm.js\' must be objects.')
      return
    }

    const defaultPlugin
      = getPluginFromListByName(defaultPlugins, eachPlugin.name)

    if (!defaultPlugin) {
      notify('HyperLine', `Plugin with name "${eachPlugin.name}" does not exist.`)
    } else {
      if (eachPlugin.options === undefined) {
        eachPlugin.options = defaultPlugin.options
      }

      const validator = plugins[eachPlugin.name].validateOptions
      if (validator !== undefined) {
        const errors = validator(eachPlugin.options)
        if (errors.length > 0) {
          errors.forEach(each => notify(`HyperLine '${eachPlugin.name}' plugin`, each))
          eachPlugin.options = defaultPlugin.options
        }
      }

      finalOptions.push(eachPlugin)
    }
  })

  return finalOptions
}

function getPluginFromListByName(pluginList, name) {
  if (!name) {
    return undefined
  }

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

export function decorateHyperTerm(HyperTerm, {React, notify}) {
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
      const mergedConfig = mergeConfigs(defaultConfig, userConfig, notify)

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
