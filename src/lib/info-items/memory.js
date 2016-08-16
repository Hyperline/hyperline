import os from 'os'

export function memoryFactory( React ) {
  return class extends React.Component {
    constructor( props ) {
      super( props )
      this.state = {
        freeMemory: this.calculateFreeMemory(),
        totalMemory: this.getMb( os.totalmem() )
      }

      setInterval( () => this.calculateFreeMemory(), 100 )
    }

    getMb( bytes ) {
      return ( bytes / ( 1024 * 1024 ) ).toFixed( 0 ) + 'MB'
    }

    calculateFreeMemory() {
      const freeMemory = this.getMb( os.freemem() )
      this.setState( { freeMemory } )
      return freeMemory
    }

    render() {
      return (
        <div style={this.props.style}>
          {this.state.freeMemory} / {this.state.totalMemory}
        </div>
      )
    }
  }
}
