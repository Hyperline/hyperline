import React from 'react'
import Component from 'hyper/component'
import SvgIcon from '../utils/SvgIcon'


class PullIcon extends Component {
  styles() {
    return {
      'pull-icon' : {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g className={css('pull-icon')} transform="translate(1.000000, 1.000000)">
            <g>
              <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"/>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Pull extends Component {
  static displayName() {
    return 'Pull-right plugin'
  }

  constructor() {
    super(props)

    this.state = {
      isRight: 0
    }
  }


  performContainerShift() {
      
  }


  componentDidMount() {

  }
}
