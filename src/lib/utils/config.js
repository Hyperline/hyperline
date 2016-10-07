import { colorExists } from './colors'
import plugins from '../plugins'

function getPluginFromListByName(pluginList, name) {
  return pluginList.find(each => each.name === name)
}

function mergeColorConfigs(defaultColor, userColor = false) {
  if (!userColor || !colorExists(userColor)) {
    return defaultColor
  }

  return userColor
}

function mergePluginConfigs(defaultPlugins, userPlugins, notify) {
  if (!userPlugins) {
    return defaultPlugins
  }

  return userPlugins.reduce((newPlugins, plugin) => {
    const newPlugin = Object.assign({}, plugin)
    const { name, options = false } = plugin

    if (typeof plugin !== 'object' || Array.isArray(plugin)) {
      notify('HyperLine', '\'plugins\' array members in \'.hyper.js\' must be objects.')
      return newPlugins
    }

    const { options: defaultOptions = false } = getPluginFromListByName(defaultPlugins, name)

    if (!defaultOptions) {
      notify('HyperLine', `Plugin with name "${name}" does not exist.`)
      return newPlugins
    }

    if (options) {
      newPlugin.options = defaultOptions
    }

    const { validateOptions: validator = false } = plugins[name]
    if (validator) {
      const errors = validator(options)
      if (errors.length > 0) {
        errors.forEach(error => notify(`HyperLine '${name}' plugin`, error))
        newPlugin.options = defaultOptions
      }
    }

    return [ ...newPlugins, plugin ]
  }, [])
}

export function getDefaultConfig(plugins) {
  return {
    color: 'black',
    plugins: Object.keys(plugins).reduce((pluginsArray, pluginName) => {
      const { defaultOptions } = plugins[pluginName]

      const plugin = {
        name: pluginName,
        options: defaultOptions
      }

      return [ ...pluginsArray, plugin ]
    }, [])
  }
}

export function mergeConfigs(defaultConfig, userConfig = false, notify) {
  if (!userConfig) {
    return defaultConfig
  }

  return {
    color: mergeColorConfigs(defaultConfig.color, userConfig.color),
    plugins: mergePluginConfigs(defaultConfig.plugins, userConfig.plugins, notify)
  }
}
