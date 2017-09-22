import React from 'react'
import PropTypes from 'prop-types';
import Critical from './critical'
import Charging from './charging'
import Draining from './draining'

function BatteryIcon({ charging, percentage }) {
  if (charging) {
    return <Charging />
  }

  if (percentage <= 20) {
    return <Critical />
  }

  return <Draining percentage={percentage} />
}

BatteryIcon.propTypes = {
  charging: PropTypes.bool,
  percentage: PropTypes.number
}

export default BatteryIcon
