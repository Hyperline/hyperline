import { getColorList } from './lib/utils/colors'
import { hostnameFactory } from "./lib/info-items/hostname"
import { memoryFactory } from "./lib/info-items/memory"
import { uptimeFactory } from "./lib/info-items/uptime"
import { cpuFactory } from "./lib/info-items/cpu"

const LINE_HEIGHT = "18px"
const LINE_PADDING = "10px"
const FONT_STYLE = "bold 12px Monospace"
const ITEM_MARGIN = "7px"

const LINE_COLOR = "#222222"

const HOSTNAME_COLOR = "#00D0FF"
const MEMORY_INFO_COLOR = "#FFFFFF"
const UPTIME_INFO_COLOR = "#FFCC00"

export function mapHyperTermState (state, map) {
  return Object.assign({}, map, {
    colors: state.ui.colors
  })
}

export function decorateHyperTerm (HyperTerm, { React }) {
  const HyperLine = ({ children }) => {
    return (
      <div style={{
        display      : "flex",
        alignItems   : "center",
        position     : "absolute",
        bottom       : 0,
        width        : "100%",
        height       : LINE_HEIGHT,
        paddingLeft  : LINE_PADDING,
        paddingRight : LINE_PADDING,
        background   : LINE_COLOR,
        font         : FONT_STYLE,
        pointerEvents: "none"
      }}>
        {children}
      </div>
    )
  }

  return class extends React.Component {
    constructor (props, context) {
      super(props, context)

      this.colors = getColorList(this.props.colors)
      this.plugins = [
        {
          componentFactory: hostnameFactory,
          color           : this.colors.blue
        },
        {
          componentFactory: memoryFactory,
          color           : this.colors.white
        },
        {
          componentFactory: uptimeFactory,
          color           : this.colors.yellow
        },
        {
          componentFactory: cpuFactory,
          color           : "transparent"
        }
      ]
    }

    render () {
      return <HyperTerm {...this.props} customChildren={(
        <HyperLine>
          {this.plugins.map((item) => {
            const Component = item.componentFactory(React, this.colors)
            return <Component style={{
              marginRight: ITEM_MARGIN,
              color      : item.color
            }} />
          })}
        </HyperLine>
      )} />
    }
  }
}
