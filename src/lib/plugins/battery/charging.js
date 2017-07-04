import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../../utils/svg-icon'

export default class Charging extends Component {
  styles() {
    return {
      'cpu-charging-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className={css('cpu-charging-icon')}>
            <path d="M9,10 L10,10 L10,9 L6,9 L6,10 L7,10 L7,13 L9,13 L9,10 Z M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z M5,6 L11,6 L11,7 L5,7 L5,6 Z M5,7 L11,7 L11,8 L5,8 L5,7 Z M5,8 L11,8 L11,9 L5,9 L5,8 Z M9,4 L10,4 L10,6 L9,6 L9,4 Z M6,4 L7,4 L7,6 L6,6 L6,4 Z"></path>
          </g>
        </g>
      </SvgIcon>
    )
  }
}
