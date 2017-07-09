/* eslint no-undef: 0 */
// Note: This is to stop XO from complaining about {navigator}

import React from 'react'
import Component from 'hyper/component'
import leftPad from 'left-pad'
import navigator from 'Navigator'
import BatteryIcon from './battery/battery-icon'

export default class Battery extends Component {
  static displayName() {
    return 'Battery plugin'
  }

  constructor(props) {
    super(props)

    this.state = {
      charging: false,
      percentage: '--'
    }

    this.batteryEvents = [ 'chargingchange', 'chargingtimechange', 'dischargingtimechange', 'levelchange' ]
    this.handleEvent = this.handleEvent.bind(this)
  }

  setBatteryStatus(battery) {
    this.setState({
      charging: battery.charging,
      percentage: Math.floor(battery.level * 100)
    })
  }

  handleEvent(event) {
    this.setBatteryStatus(event.target)
  }


  /**
   * TODO: Find out what the [navigator] object was for.
   *       It's making XO go ham
   */
  componentDidMount() {
    navigator.getBattery().then(battery => {
      this.setBatteryStatus(battery)

      this.batteryEvents.forEach(event => {
        battery.addEventListener(event, this.handleEvent, false)
      })
    })
  }

  /**
   * TODO: Find out what the [navigator] object was for.
   *       It's making XO go ham
   */
  componentWillUnmount() {
    navigator.getBattery().then(battery => {
      this.batteryEvents.forEach(event => {
        battery.removeEventListener(event, this.handleEvent)
      })
    })
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
    const { charging, percentage } = this.state

    return (
      <div className={css('wrapper')}>
        <BatteryIcon charging={charging} percentage={percentage} /> {leftPad(percentage, 2, 0)}%
      </div>
    )
  }
}
