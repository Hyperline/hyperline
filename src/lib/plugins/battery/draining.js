import React from 'react'
import PropTypes from 'prop-types'
import Component from 'hyper/component'
import SvgIcon from '../../utils/svg-icon'

export default class Draining extends Component {
  static propTypes() {
    return {
      percentage: PropTypes.number
    }
  }

  calculateChargePoint(percent) {
    const base = 3.5,
      val = Math.round((100 - percent) / 4.5),
      point = base + (val / 2)

    return val > 0 ? `M5,3 L11,3 L11,${point} L5,${point} L5,3 Z` : ''
  }

  styles() {
    return {
      'cpu-discharging-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    const chargePoint = this.calculateChargePoint(this.props.percentage)
    return (
      <SvgIcon>
        <g fillRule="evenodd">
          <g className={css('cpu-discharging-icon')}>
            <path d={`M7,1 L9,1 L9,2 L7,2 L7,1 Z M4,2 L12,2 L12,15 L4,15 L4,2 Z ${chargePoint}`}></path>
          </g>
        </g>
      </SvgIcon>
    )
  }
}
