import moment from 'moment'

export function formatUptime(uptime) {
  const uptimeInMoment = moment.duration(uptime, 'seconds')
  const days = uptimeInMoment.days()
  const hours = uptimeInMoment.hours()
  const daysFormatted = days ? days + 'd' : ''
  const hoursFormatted = hours ? hours + 'h' : ''

  return [ daysFormatted, hoursFormatted ].filter(Boolean).join(' ')
}
