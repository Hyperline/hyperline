import Color from 'color'

const style = {
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '18px',
  font: 'bold 12px Monospace',
  pointerEvents: 'none'
}

export const hyperlineFactory = (React) => {
  const HyperLine = ({
    fontFamily,
    colors,
    plugins
  }) => {
    return (
      <div
        style={Object.assign(style, {
          fontFamily,
          background: Color(colors.black).darken(0.2).hslString()
        })}
      >
        {plugins.map((item) => {
          const Plugin = item.componentFactory(React, colors)
          return <Plugin style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '7px',
            paddingRight: '7px',
            borderColor: 'rgba(255, 255, 255, .2)',
            borderWidth: '0',
            borderLeft: '1px',
            borderStyle: 'solid',
            color: item.color,
          }} />
        })}
      </div>
    )
  }

  HyperLine.propTypes = {
    fontFamily: React.PropTypes.string.isRequired,
    colors: React.PropTypes.object.isRequired,
    plugins: React.PropTypes.array.isRequired
  }

  return HyperLine
}
