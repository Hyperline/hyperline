import {hyperlineFactory} from './lib/core/hyperline'
import {getColorList} from './lib/utils/colors'

import factories from './lib/plugins'

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
          componentFactory: factories.hostname,
          options: {
            color: 'lightBlue'
          }
        },
        {
          componentFactory: factories.memory,
          options: {
            color: 'white'
          }
        },
        {
          componentFactory: factories.uptime,
          options: {
            color: 'lightYellow'
          }
        },
        {
          componentFactory: factories.cpu,
          options: {
            colors: {
              high: 'lightRed',
              moderate: 'lightYellow',
              low: 'lightGreen'
            }
          }
        },
        {
          componentFactory: factories.network,
          options: {
            color: 'lightCyan'
          }
        },
        {
          componentFactory: factories.battery,
          options: {
            colors: {
              fine: 'lightGreen',
              critical: 'lightRed'
            }
          }
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
