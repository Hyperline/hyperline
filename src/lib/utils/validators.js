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

export const validateOptionsWith = (options, validators) => {
  return validators
    .map((validator) => validator(options))
    .reduce((e1, e2) => e1.concat(e2), [])
}
