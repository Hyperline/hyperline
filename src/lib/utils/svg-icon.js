import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'

export default class SvgIcon extends Component {
  static propTypes() {
    return {
      children: PropTypes.element.isRequired
    }
  }

  styles() {
    return {
      icon: {
        marginRight: '7px',
        width: '16px',
        height: '16px'
      }
    }
  }

  template(css) {
    return (
      <svg className={css('icon')} xmlns="http://www.w3.org/2000/svg">
        {this.props.children}
      </svg>
    )
  }
}
