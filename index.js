var os = require("os")

exports.decorateTerm = (Term, { React, notify }) => {
  return class extends React.Component {
    constructor (props, context) {
      super(props, context);
      this._onTerminal = this._onTerminal.bind(this);
      this._drawFrame = this._drawFrame.bind(this);
      this._resizeCanvas = this._resizeCanvas.bind(this);
      this._fetchData = this._fetchData.bind(this);
      this._canvas = null

      this._fetchData()
    }

    /**
     * Called when a new terminal instance is loaded
     */
    _onTerminal (term) {
      console.log(term)
      if (this.props.onTerminal) this.props.onTerminal(term);
      this._div = term._div;
      this._window = term.document_.defaultView;
      this._initCanvas()
    }

    /**
     * Called by _onTerminal to initialize the canvas.
     * The canvas is rendered on top of the terminal window
     */
    _initCanvas () {
      this._canvas = document.createElement('canvas');
      this._canvas.style.position = 'absolute';
      this._canvas.style.top = '0';
      this._canvas.style.pointerEvents = 'none';
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      this._canvasContext = this._canvas.getContext('2d');
      document.body.appendChild(this._canvas);
      this._window.requestAnimationFrame(this._drawFrame);
      this._window.addEventListener('resize', this._resizeCanvas);
    }

    _drawFrame() {
      this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

      this._canvasContext.fillStyle="#222222"
      this._canvasContext.fillRect(0,this._canvas.height - 18,this._canvas.width,18)

      this._canvasContext.fillStyle="#FFFFFF"
      this._canvasContext.font = 'bold 0.8pc Monospace';

      let avMem  = (this._sysData.avmem / (1024 * 1024)).toFixed(0) + "MB"
      let ttMem  = (this._sysData.ttmem / (1024 * 1024)).toFixed(0) + "MB"
      let upTime  = (this._sysData.uptime / 3600).toFixed(0) + "HRS"
      let hostName = (this._sysData.hostname)

      this._fetchData()
      this._canvasContext.fillText(hostName + " " + avMem + "/" + ttMem + " " + upTime, 5, this._canvas.height - 5);

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

    _resizeCanvas() {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;
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
};
