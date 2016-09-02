export default {
  color: 'black',
  plugins: [
    {
      name: 'hostname',
      options: {
        color: 'lightBlue'
      }
    },
    {
      name: 'memory',
      options: {
        color: 'white'
      }
    },
    {
      name: 'uptime',
      options: {
        color: 'lightYellow'
      }
    },
    {
      name: 'cpu',
      options: {
        colors: {
          high: 'lightRed',
          moderate: 'lightYellow',
          low: 'lightGreen'
        }
      }
    },
    {
      name: 'network',
      options: {
        color: 'lightCyan'
      }
    },
    {
      name: 'battery',
      options: {
        colors: {
          fine: 'lightGreen',
          critical: 'lightRed'
        }
      }
    }
  ]
}
