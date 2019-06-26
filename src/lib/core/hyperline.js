import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import decorate from 'hyper/decorate'

class HyperLine extends Component {
  static propTypes() {
    return {
      plugins: PropTypes.array.isRequired,
      notify: PropTypes.func
    }
  }

  render() {
    const { plugins, notify, ...props } = this.props

    return (
      <div className="line" {...props}>
        {plugins.map((Component, index) => (
          <div key={index} className="wrapper">
            <Component notify={notify} />
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
            user-select: none;
            background: rgba(0, 0, 0, 0.08);
            margin: 2px 0;
            margin-left: -12px;
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
