module.exports = {
  withColor: function(infoItem, color) {
    return {
      render: function(ctx, pos) {
        ctx.save()
        ctx.fillStyle = color

        var itemWidth = infoItem.render(ctx, pos)
        ctx.restore()

        return itemWidth
      }
    }
  }
}
