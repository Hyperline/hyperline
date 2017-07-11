import React from 'react'
import Component from 'hyper/component'

export default class PartyParrot extends Component {
  static displayName() {
    return "Party parrot plugin"
  }


  constructor(props) {
    super(props)

    this.state = {
      isAnimating: false
    }
  }

  componentDidMount() {
    this.setState({
      isAnimating: true
    })
  }

  componentWillUnmount() {
    this.setState({
      isAnimating: false
    })
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center'
      },
      partyParrotIcon: {
        width: 35,
        height: 35
      }
    }
  }

  template(css) {
    return (
      <div className={css('wrapper')}>
        <img className={css('partyParrotIcon')} src={'http://cultofthepartyparrot.com/parrots/hd/parrot.gif'} title={"It's PARTY TIME!"} />
      </div>
    )
  }
}
