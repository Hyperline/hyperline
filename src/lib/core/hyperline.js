import React from 'react'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: React.PropTypes.array.isRequired
    }
  }

  styles() {
    return {
      line: {
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        width: '100%',
        height: '18px',
        font: 'bold 12px Monospace',
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.2)'
      },
      wrapper: {
        display: 'flex',
        flexShrink: '0',
        alignItems: 'center',
        paddingLeft: '7px',
        paddingRight: '7px',
        borderLeft: '1px',
        borderTop: '0px',
        borderRight: '0px',
        borderBottom: '0px',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, .2)'
      }
    }
  }
  template(css) {
    const { plugins } = this.props

    return (
      <div className={css('line')} {...this.props}>
        {plugins.map((Component, index) => (
          <div key={index} className={css('wrapper')}>
            <Component />
          </div>
        ))}
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
