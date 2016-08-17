import {
  LINE_HEIGHT,
  LINE_PADDING,
  FONT_STYLE,
  ITEM_MARGIN
} from './constants'

export const hyperlineFactory = (React) => {
  const HyperLine = ({style, colors, plugins}) => {
    return (
      <div style={Object.assign({}, {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: LINE_HEIGHT,
        paddingLeft: LINE_PADDING,
        paddingRight: LINE_PADDING,
        font: FONT_STYLE,
        pointerEvents: 'none'
      }, style)}>
        {plugins.map((item) => {
          const Component = item.componentFactory(React, colors)
          return <Component style={{
            marginRight: ITEM_MARGIN,
            color: item.color
          }} />
        })}
      </div>
    )
  }

  HyperLine.propTypes = {
    colors: React.PropTypes.object,
    style: React.PropTypes.object,
    plugins: React.PropTypes.array
  }

  return HyperLine
}
