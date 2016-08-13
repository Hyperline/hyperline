import { render as hostname } from './lib/info-items/hostname'
import { render as memory } from './lib/info-items/memory'
import { render as uptime } from './lib/info-items/uptime'
import { render as cpu } from './lib/info-items/cpu'

const LINE_HEIGHT = 18
const LINE_PADDING = 10
const FONT_STYLE = "bold 12px Monospace"
const ITEM_MARGIN = '7px'

const LINE_COLOR = "#222222"

const HOSTNAME_COLOR = "#00D0FF"
const MEMORY_INFO_COLOR = "#FFFFFF"
const UPTIME_INFO_COLOR = "#FFCC00"

const items = [
  {
    render: hostname,
    color : HOSTNAME_COLOR
  },
  {
    render: memory,
    color : MEMORY_INFO_COLOR
  },
  {
    render: uptime,
    color : UPTIME_INFO_COLOR
  },
  {
    render: cpu,
    color : 'transparent'
  }
]

export function decorateHyperTerm (HyperTerm, { React }) {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._initHyperLine = this._initHyperLine.bind(this)
      this._hyperline = null
      this._initHyperLine()
    }

    /**
     * Creates html line at the bottom of the terminal
     */
    _initHyperLine () {
      const hyperline = document.createElement('div')
      hyperline.setAttribute('id', 'hyperline')

      Object.assign(hyperline.style, {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: LINE_HEIGHT + 'px',
        paddingLeft: LINE_PADDING + 'px',
        paddingRight: LINE_PADDING + 'px',
        background: LINE_COLOR,
        font: FONT_STYLE,
        pointerEvents: 'none'
      })

      this._hyperline = document.body.appendChild(hyperline)

      items.forEach((item) => {
        const child = hyperline.appendChild(document.createElement('div'))

        Object.assign(child.style, {
          color: item.color,
          marginRight: ITEM_MARGIN
        })

        item.render(child)
      })
    }

    render () {
      return React.createElement(HyperTerm, this.props)
    }

    componentWillUnmount () {
      document.body.removeChild(this._hyperline)
    }
  }
}
