import moment from 'moment'

export function formatUptime(uptime) {
  const uptimeInHours = Number((uptime/3600).toFixed(0));

  if (uptimeInHours === 0) {
    return '0h'
  }

  const uptimeInMoment = moment.duration(uptimeInHours, 'hours')
  const days = uptimeInMoment.days()
  const hours = uptimeInMoment.hours()
  const daysFormatted = days ? days + 'd' : ''
  const hoursFormatted = hours ? hours + 'h' : ''

  return [ daysFormatted, hoursFormatted ].filter(Boolean).join(' ')
}
