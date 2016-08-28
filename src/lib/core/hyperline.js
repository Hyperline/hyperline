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
            color: item.color,
            paddingLeft: '7px',
            paddingRight: '7px',
            borderLeft: '1px',
            borderTop: '0px',
            borderRight: '0px',
            borderBottom: '0px',
            borderStyle: 'solid',
            borderColor: 'rgba(255, 255, 255, .2)',
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
