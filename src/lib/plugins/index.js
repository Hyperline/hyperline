import {hostnameFactory} from './hostname'
import {memoryFactory} from './memory'
import {uptimeFactory} from './uptime'
import {cpuFactory} from './cpu'
import {networkSpeedFactory} from './network'
import {batteryFactory} from './battery'

export default {
  'hostname': hostnameFactory,
  'memory': memoryFactory,
  'uptime': uptimeFactory,
  'cpu': cpuFactory,
  'network': networkSpeedFactory,
  'battery': batteryFactory
}
