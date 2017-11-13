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
  return Object.assign({}, map, {
    colors: getColorList(colors),
    fontFamily
  })
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

      return <HyperLine {...this.props} plugins={plugins} />
    }
  }
}

export function decorateHyper(Hyper) {
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
          <HyperLine style={{ fontFamily: this.props.fontFamily }} />
        </div>
      )

      return <Hyper {...this.props} customChildren={customChildren} />
    }
  }
}
