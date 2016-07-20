var os = require("os")

exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context)
      this._onTerminal = this._onTerminal.bind(this)
      this._drawFrame = this._drawFrame.bind(this)
      this._resizeCanvas = this._resizeCanvas.bind(this)
      this._scaleCanvas = this._scaleCanvas.bind(this)
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
      // Color constants
      const LINE_HEIGHT = 18
      const LINE_PADDING = 5
      const FONT_STYLE = "bold 0.8pc Monospace"
      const LINE_COLOR = "#222222"
      const HOSTNAME_COLOR = "#00D0FF"
      const MEMORY_INFO_COLOR = "#FFFFFF"
      const UPTIME_INFO_COLOR = "#FFCC00"
      const CPU_USAGE_COLORS = {
        HIGH: "#FF0000",
        MODERATE: "#F6FF00",
        LOW: "#15FF00"
      }

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

      this._fetchData()

      // Hostname
      ctx.fillStyle = HOSTNAME_COLOR
      let hostName = (this._sysData.hostname)
      let toPrint = hostName + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      // Memory info
      ctx.fillStyle = MEMORY_INFO_COLOR
      let avMem  = (this._sysData.avmem / (1024 * 1024)).toFixed(0) + "MB"
      let ttMem  = (this._sysData.ttmem / (1024 * 1024)).toFixed(0) + "MB"
      toPrint = avMem + "/" + ttMem + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      // Uptime info
      ctx.fillStyle = UPTIME_INFO_COLOR
      let upTime = (this._sysData.uptime / 3600).toFixed(0) + "HRS"
      toPrint = upTime + " "
      ctx.fillText(toPrint, x_start, y_offset)
      x_start += ctx.measureText(toPrint).width

      // CPU usage
      const cpuAvg = this._cpuAverage()
      if (cpuAvg < 50) {
        ctx.fillStyle = CPU_USAGE_COLORS.LOW
      } else if (cpuAvg < 75){
        ctx.fillStyle = CPU_USAGE_COLORS.MODERATE
      } else {
        ctx.fillStyle = CPU_USAGE_COLORS.LOW
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
        const cpu = cpus[i]

        var type
        for (type in cpu.times) {
          totalTick += cpu.times[type]
        }

        totalIdle += cpu.times.idle
      }

      const idle = totalIdle / cpus.length
      const total = totalTick / cpus.length

      var rtn = ""
      if (this._idleCpu) {
        const idleDifference = idle - this._idleCpu
        const totalDifference = total - this._totalCpu
        rtn = 100 - ~~(100 * idleDifference / totalDifference)
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
