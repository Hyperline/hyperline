import { colorExists } from './colors'

export const validateUpdateIntervalMs = (options) => {
  const errors = []

  if (typeof options.updateIntervalMs === 'undefined') {
    errors.push('\'updateIntervalMs\' is required but missing.')
  } else {
    if (typeof options.updateIntervalMs !== 'number') {
      errors.push('update interval must be defined as a number.')
    } else {
      if (options.updateIntervalMs < 1) {
        errors.push('update interval must be at least 1ms.')
      }
    }
  }

  return errors
}

export const validateColor = (options) => {
  let error

  if (!options.color) {
    error = '\'color\' color string is required but missing.'
  } else if (!colorExists(options.color)) {
    error = `invalid color '${options.color}'`
  }

  if (error === undefined) {
    return []
  } else {
    return [ error ]
  }
}

export const combineValidators = (validators) => {
  return (options) => {
    return validators
      .map((validator) => validator(options))
      .reduce((e1, e2) => e1.concat(e2), [])
  }
}
