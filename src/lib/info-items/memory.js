import os from 'os'

function getFreeMemory () {
  return (os.freemem() / (1024 * 1024)).toFixed(0) + 'MB'
}

export function render (child) {
  const total = (os.totalmem() / (1024 * 1024)).toFixed(0) + 'MB'

  child.innerHTML = getFreeMemory() + '/' + total

  setInterval(() => child.innerHTML = getFreeMemory() + '/' + total, 100)
}