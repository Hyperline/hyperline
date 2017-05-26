import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../../utils/SvgIcon'

export default class Critical extends Component {
  styles() {
    return {
      'cpu-critical-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className={css('cpu-critical-icon')}>
            <path d="M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,3 L11,3 L11,11 L5,11 L5,3 Z"></path>
          </g>
        </g>
      </SvgIcon>
    )
  }
}
