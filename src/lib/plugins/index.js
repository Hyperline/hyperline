import * as hostname from './hostname'
import * as ip from './ip'
import * as memory from './memory'
import * as uptime from './uptime'
import * as cpu from './cpu'
import * as network from './network'
import * as battery from './battery'
import * as time from './time';
import * as spotify from './spotify';

/**
 * Exports a mapping from plugin name to associated component factory.
 * Object keys match those used in the configuration object
 */
export default { hostname, ip, memory, uptime, cpu, network, battery, time, spotify }
