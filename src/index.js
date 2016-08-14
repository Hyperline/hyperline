import { withColor } from "./lib/utils"
import hostname from "./lib/info-items/hostname"
import memory from "./lib/info-items/memory"
import uptime from "./lib/info-items/uptime"
import cpu from "./lib/info-items/cpu"

const LINE_HEIGHT = 18
const LINE_PADDING = 5
const FONT_STYLE = "bold 0.8pc Monospace"
const ITEM_MARGIN = 7

const LINE_COLOR = "#222222"

const HOSTNAME_COLOR = "#00D0FF"
const MEMORY_INFO_COLOR = "#FFFFFF"
const UPTIME_INFO_COLOR = "#FFCC00"

var items = [
  withColor(hostname, HOSTNAME_COLOR),
  withColor(memory, MEMORY_INFO_COLOR),
  withColor(uptime, UPTIME_INFO_COLOR),
  cpu
]

module.exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this)
      this._initCanvas = this._initCanvas.bind(this)
      this._scaleCanvas = this._scaleCanvas.bind(this)
      this._drawFrame = this._drawFrame.bind(this)
      this._resizeCanvas = this._resizeCanvas.bind(this)
      this._canvas = null
    }

    /**
     * Called when a new terminal instance is loaded
     */
    _onTerminal (term) {
      if (this.props.onTerminal) this.props.onTerminal(term)
      this._div = term._div
      this._window = term.document_.defaultView
      this._initCanvas()
    }

    /**
     * Creates global canvas and context objects
     */
    _initCanvas () {
      this._canvas = document.createElement('canvas')
      this._canvas.style.position = 'absolute'
      this._canvas.style.top = '0'
      this._canvas.style.pointerEvents = 'none'
      this._canvasContext = this._canvas.getContext('2d')
      document.body.appendChild(this._canvas)
      this._window.requestAnimationFrame(this._drawFrame)
      this._window.addEventListener('resize', this._resizeCanvas)

      this._scaleCanvas()
    }

    /**
     * Adjusts canvas size to account for high-dpi monitors.
     * Ideally this should be run every time the terminal is moved
     * to a different screen.
     */
    _scaleCanvas() {
      const canvas = this._canvas
      const ctx = this._canvasContext

      const devicePixelRatio = window.devicePixelRatio || 1
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio
        || ctx.backingStorePixelRatio
        || 1

      this._ratio = devicePixelRatio / backingStoreRatio
      console.log(this._ratio)

      canvas.width = window.innerWidth * this._ratio
      canvas.height = window.innerHeight * this._ratio

      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(this._ratio, this._ratio)
    }

    /**
     * Main render function - draws the status bar on the canvas.
     */
    _drawFrame() {
      // Prepare canvas, render line rect
      const canvas = this._canvas
      const ratio = this._ratio
      const ctx = this._canvasContext

      const canvasWidth = canvas.width / ratio
      const canvasHeight = canvas.height / ratio

      var x_start = LINE_PADDING
      const y_offset = canvasHeight - LINE_PADDING

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      ctx.fillStyle=LINE_COLOR
      ctx.fillRect(0,canvasHeight - LINE_HEIGHT,canvasWidth, LINE_HEIGHT)

      ctx.font = FONT_STYLE

      items.forEach(function(each) {
        x_start += each.render(ctx, {
          x: x_start,
          y: y_offset
        })

        x_start += ITEM_MARGIN
      })

      setTimeout(() => {this._window.requestAnimationFrame(this._drawFrame)},200)
    }

    _resizeCanvas() {
      this._canvas.width = window.innerWidth
      this._canvas.height = window.innerHeight
      this._scaleCanvas()
    }

    render () {
      return React.createElement(Term, Object.assign({}, this.props, {
        onTerminal: this._onTerminal
      }))
    }

    componentWillUnmount () {
      document.body.removeChild(this._canvas)
    }
  }
}
