/* eslint no-undef: 0 */
// Note: This is to stop XO from complaining about {navigator}

import React, { Component } from 'react'
import leftPad from 'left-pad'
import BatteryIcon from './battery/battery-icon'

export default class Battery extends Component {
  static displayName() {
    return 'battery'
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

  componentDidMount() {
    navigator.getBattery().then(battery => {
      this.setBatteryStatus(battery)

      this.batteryEvents.forEach(event => {
        battery.addEventListener(event, this.handleEvent, false)
      })
    })
  }

  componentWillUnmount() {
    navigator.getBattery().then(battery => {
      this.batteryEvents.forEach(event => {
        battery.removeEventListener(event, this.handleEvent)
      })
    })
  }

  render() {
    const { charging, percentage } = this.state

    return (
      <div className='wrapper'>
        <BatteryIcon charging={charging} percentage={Number(percentage)} /> {leftPad(percentage, 2, 0)}%

        <style jsx>{`
          .wrapper {
            display: flex;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }
}
