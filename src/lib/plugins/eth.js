import React from 'react'
import Component from 'hyper/component'
import fetch from 'axios'
import SvgIcon from '../utils/svg-icon'


class PluginIcon extends Component {
  styles() {
    return {
      'eth-icon': {
        fill: '#fff'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g
            className={css('eth-icon')}
            transform="translate(1.000000, 1.000000)"
          >
            <g>
            <text x="0" y="35" font-family="Verdana" font-size="35" fill="white">
              💸
            </text>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class ETH extends Component {
  static displayName() {
    return 'eth'
  }

  constructor(props) {
    super(props)

    this.state = {
      eth: this.fetchCurrentPrice()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(this.fetchCurrentPrice())
    }, 100)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  fetchCurrentPrice() {
    fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
    .then(response => this.setState({eth: response.data[0].price_usd}))
    .catch(err => console.error('error'))
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      }
    }
  }

  template(css) {
    return (
      <div className={css('wrapper')}>
        <PluginIcon /> {this.state.eth}
      </div>
    )
  }
}
