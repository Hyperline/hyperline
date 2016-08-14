import os from "os"

module.exports = {
  get: function() {
    return (os.uptime() / 3600).toFixed(0) + "HRS"
  },

  render: function(ctx, pos) {
    const toPrint = this.get()

    ctx.fillText(toPrint, pos.x, pos.y)
    return ctx.measureText(toPrint).width
  }
}
