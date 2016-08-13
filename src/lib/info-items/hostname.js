import os from 'os'

export function render (child) {
  child.innerHTML = os.hostname()
}
