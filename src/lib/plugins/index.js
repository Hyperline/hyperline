import { componentFactory as hostname } from './hostname'
import { componentFactory as memory } from './memory'
import { componentFactory as uptime } from './uptime'
import { componentFactory as cpu } from './cpu'
import { componentFactory as network } from './network'
import { componentFactory as battery } from './battery'

/**
 * Exports a mapping from plugin name to associated component factory.
 * Object keys match those used in the configuration object
 */
export default { hostname, memory, uptime, cpu, network, battery }
