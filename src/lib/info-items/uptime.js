import os from 'os'

export function render (child) {
  child.innerHTML = (os.uptime() / 3600).toFixed(0) + "HRS"
}
