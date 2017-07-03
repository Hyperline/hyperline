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
        font: 'bold 10px Monospace',
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.08)',
        margin: '10px'
      },
      wrapper: {
        display: 'flex',
        flexShrink: '0',
        alignItems: 'center',
        paddingLeft: '10px',
        paddingRight: '10px'
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
