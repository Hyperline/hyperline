import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HyperLine from './lib/core/hyperline'
import { getColorList } from './lib/utils/colors'
import hyperlinePlugins from './lib/plugins'

export function reduceUI(state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperline', config.hyperline)
    }
    default:
      break
  }

  return state
}

export function mapHyperState({ ui: { colors, fontFamily, hyperline } }, map) {
  let userPlugins = []
  if (hyperline !== undefined) {
    if (hyperline.plugins !== undefined) {
      userPlugins = hyperline.plugins
    }
  }

  return Object.assign({}, map, {
    colors: getColorList(colors),
    fontFamily,
    userPlugins
  })
}

function pluginsByName(plugins) {
  const dict = {}
  plugins.forEach((plugin) => {
    dict[plugin.displayName()] = plugin
  })

  return dict
}

function filterPluginsByConfig(plugins) {
  const config = window.config.getConfig().hyperline
  if (!config) return plugins

  const userPluginNames = config.plugins
  if (!userPluginNames) {
    return plugins
  }

  plugins = pluginsByName(plugins)
  const filtered = []

  userPluginNames.forEach((name) => {
    if (plugins.hasOwnProperty(name)) {
      filtered.push(plugins[name])
    }
  })

  return filtered
}

export function decorateHyperLine(HyperLine) {
  return class extends Component {
    static displayName() {
      return 'HyperLine'
    }

    static propTypes() {
      return {
        plugins: PropTypes.array.isRequired
      }
    }

    static get defaultProps() {
      return {
        plugins: []
      }
    }

    render() {
      const plugins = [...this.props.plugins, ...hyperlinePlugins]

      return <HyperLine {...this.props} plugins={filterPluginsByConfig(plugins)} />
    }
  }
}

export function decorateTerm(Term, { notify }) {
  return class extends Component {
    static displayName() {
      return 'Hyper'
    }

    static propTypes() {
      return {
        colors: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        fontFamily: PropTypes.string,
        customChildren: PropTypes.element.isRequired
      }
    }

    render() {
      const customChildren = (
        <div>
          {this.props.customChildren}
          <HyperLine notify={notify} style={{ fontFamily: this.props.fontFamily }} />
        </div>
      )

      return <Term {...this.props} customChildren={customChildren} />
    }
  }
}
