var os = require("os")

exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this)
      this._drawFrame = this._drawFrame.bind(this)
      this._resizeCanvas = this._resizeCanvas.bind(this)
      this._fixCanvasScaling = this._fixCanvasScaling.bind(this)
      this._fetchData = this._fetchData.bind(this)
      this._cpuAverage = this._cpuAverage.bind(this)
      this._canvas = null

      this._fetchData()
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
     * Called by _onTerminal to initialize the canvas.
     * The canvas is rendered on top of the terminal window
     */
    _initCanvas () {
      this._canvas = document.createElement('canvas')
      this._canvas.style.position = 'absolute'
      this._canvas.style.top = '0'
      this._canvas.style.pointerEvents = 'none'
      this._canvas.width = window.innerWidth
      this._canvas.height = window.innerHeight

      this._canvasContext = this._canvas.getContext('2d')
      document.body.appendChild(this._canvas)
      this._window.requestAnimationFrame(this._drawFrame)
      this._window.addEventListener('resize', this._resizeCanvas)

      this._fixCanvasScaling()
    }

    _fixCanvasScaling() {
      var canvas = this._canvas,
          context = this._canvasContext

      var devicePixelRatio = window.devicePixelRatio || 1
      var backingStoreRatio =
        context.webkitBackingStorePixelRatio || context.backingStorePixelRatio || 1

      this._ratio = devicePixelRatio / backingStoreRatio

      if (this._ratio !== 1) {
        var oldWidth = canvas.width
        var oldHeight = canvas.height

        canvas.width = oldWidth * this._ratio
        canvas.height = oldHeight * this._ratio

        canvas.style.width = oldWidth + 'px'
        canvas.style.height = oldHeight + 'px'

        context.scale(this._ratio, this._ratio)
      }
    }

    _drawFrame() {
      var ctx = this._canvasContext

      var canvasWidth = this._canvas.width / this._ratio
      var canvasHeight = this._canvas.height / this._ratio

      var x_start = 5
      var y_offset = canvasHeight - 5

      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      ctx.fillStyle="#222222"
      ctx.fillRect(0,canvasHeight - 18,canvasWidth, 18)

      ctx.font = 'bold 0.8pc Monospace'

      this._fetchData()

      ctx.fillStyle="#00D0FF"
      let hostName = (this._sysData.hostname)
      let toPrint = hostName + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      ctx.fillStyle="#FFFFFF"
      let avMem  = (this._sysData.avmem / (1024 * 1024)).toFixed(0) + "MB"
      let ttMem  = (this._sysData.ttmem / (1024 * 1024)).toFixed(0) + "MB"
      toPrint = avMem + "/" + ttMem + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      ctx.fillStyle="#FFCC00"
      let upTime  = (this._sysData.uptime / 3600).toFixed(0) + "HRS"
      toPrint = upTime + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      let cpuAvg = this._cpuAverage()
      if (cpuAvg < 50) {
        ctx.fillStyle="#15FF00"
      } else if (cpuAvg < 75){
        ctx.fillStyle="#F6FF00"
      } else {
        ctx.fillStyle="#FF0000"
      }

      toPrint = cpuAvg + "% "
      ctx.fillText(toPrint, x_start, y_offset)

      setTimeout(() => {this._window.requestAnimationFrame(this._drawFrame)},200)
    }

    _fetchData() {
      this._sysData = {
        avmem: os.freemem(),
        ttmem: os.totalmem(),
        uptime: os.uptime(),
        hostname: os.hostname()
      }
    }

    _cpuAverage() {
      var totalIdle = 0, totalTick = 0
      var cpus = os.cpus()

      for (var i = 0, len = cpus.length; i < len; i++) {
        var cpu = cpus[i]

        var type
        for (type in cpu.times) {
          totalTick += cpu.times[type]
        }
        totalIdle += cpu.times.idle
      }

      var idle = totalIdle / cpus.length
      var total = totalTick / cpus.length

      var rtn = ""
      if (this._idleCpu) {
        var idleDifference = idle - this._idleCpu
        var totalDifference = total - this._totalCpu
        var rtn = 100 - ~~(100 * idleDifference / totalDifference)
      } else {
        rtn = 0
      }

      this._idleCpu = idle
      this._totalCpu = total

      return rtn
    }

    _resizeCanvas() {
      this._canvas.width = window.innerWidth
      this._canvas.height = window.innerHeight
      this._fixCanvasScaling()
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
