import * as hostname from './hostname'
import * as memory from './memory'
import * as uptime from './uptime'
import * as cpu from './cpu'
import * as network from './network'
import * as battery from './battery'

/**
 * Exports a mapping from plugin name to associated component factory.
 * Object keys match those used in the configuration object
 */
export default { hostname, memory, uptime, cpu, network, battery }
