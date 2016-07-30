var os = require("os")

module.exports = {
  get: function() {
    var free  = (os.freemem() / (1024 * 1024)).toFixed(0) + "MB"
    var total  = (os.totalmem() / (1024 * 1024)).toFixed(0) + "MB"
    return free + "/" + total
  },

  render: function(ctx, pos) {
    const toPrint = this.get()

    ctx.fillText(toPrint, pos.x, pos.y)
    return ctx.measureText(toPrint).width
  }
}
