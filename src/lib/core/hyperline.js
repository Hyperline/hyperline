import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: PropTypes.array.isRequired
    }
  }

  render() {
    const { plugins, ...props } = this.props

    return (
      <div className="line" {...props}>
        {plugins.map((Component, index) => (
          <div key={index} className="wrapper">
            <Component />
          </div>
        ))}

        <style jsx>{`
          .line {
            display: flex;
            align-items: center;
            position: absolute;
            overflow: hidden;
            bottom: 0;
            width: 100%;
            height: 18px;
            font: bold 10px Monospace;
            pointer-events: none;
            background: rgba(0, 0, 0, 0.08);
            margin: 2px 0;
            padding: 0 10px;
          },
          .wrapper {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default decorate(HyperLine, 'HyperLine')
