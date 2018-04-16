import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'

export default class SvgIcon extends Component {
  static propTypes() {
    return {
      children: PropTypes.element.isRequired
    }
  }

  render() {
    return (
      <svg className="icon" xmlns="http://www.w3.org/2000/svg">
        {this.props.children}

        <style jsx>{`
          .icon {
            margin-right: 7px;
            width: 16px;
            height: 16px;
          }
        `}</style>
      </svg>
    )
  }
}
