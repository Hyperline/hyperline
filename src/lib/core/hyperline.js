import Color from 'color'

export const hyperlineFactory = (React) => {
  const HyperLine = ({
    fontFamily,
    colors,
    plugins
  }) => {

    const lineStyle = {
      display: 'flex',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '18px',
      font: 'bold 12px Monospace',
      pointerEvents: 'none',
      fontFamily,
      background: Color(colors.black).darken(0.2).hslString()
    }

    return (
      <div
        style={lineStyle}
      >
        {plugins.map((item) => {
          const Plugin = item.componentFactory(React, colors)
          return <Plugin options={item.options} />
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
