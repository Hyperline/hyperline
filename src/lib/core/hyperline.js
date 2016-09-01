import Color from 'color'

const style = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '18px',
  paddingLeft: '10px',
  paddingRight: '10px',
  font: 'bold 12px Monospace',
  pointerEvents: 'none'
}

export const hyperlineFactory = (React) => {
  const HyperLine = ({
    fontFamily,
    colors,
    plugins
  }) => (
    <div
      style={Object.assign(style, {
        fontFamily,
        background: Color(colors.black).darken(0.2).hslString()
      })}
    >
      {plugins.map((item) => {
        const Plugin = item.componentFactory(React, colors)
        return <Plugin style={{
          marginRight: '7px',
          color: item.color
        }} />
      })}
    </div>
  )

  HyperLine.propTypes = {
    fontFamily: React.PropTypes.string.isRequired,
    colors: React.PropTypes.object.isRequired,
    plugins: React.PropTypes.array.isRequired
  }

  return HyperLine
}
