import React from 'react'
import Component from 'hyper/component'
import spotify from 'spotify-node-applescript'
import SvgIcon from '../utils/svg-icon'

class PluginIcon extends Component {
  styles() {
    return {
      'spotify-icon': {
        fill: '#1ED760'
      }
    }
  }

  template(css) {
    return (
      <SvgIcon>
        <g fill="none" fillRule="evenodd">
          <g fill="none" fillRule="evenodd">
            <g
              className={css('spotify-icon')}
              transform="translate(1.000000, 1.000000)"
            >
              <g>
                <path
                  d="m7.49996,1.06347c-3.55479,0 -6.43665,2.88178 -6.43665,6.43657c0,3.55494 2.88186,6.43649 6.43665,6.43649c3.55517,0 6.43672,-2.88155 6.43672,-6.43649c0,-3.55456 -2.88155,-6.43626 -6.4368,-6.43626l0.00008,-0.00031zm2.9518,9.28338c-0.11529,0.18908 -0.36279,0.24903 -0.55187,0.13297c-1.51126,-0.92311 -3.41374,-1.13218 -5.65427,-0.62028c-0.21591,0.04919 -0.43112,-0.08609 -0.48031,-0.30207c-0.04942,-0.21598 0.08532,-0.4312 0.30176,-0.48039c2.45189,-0.5604 4.55507,-0.31898 6.25172,0.71789c0.18908,0.11606 0.24903,0.36279 0.13297,0.55187zm0.78783,-1.75284c-0.14527,0.23635 -0.45425,0.31091 -0.69022,0.16564c-1.73016,-1.06369 -4.36752,-1.37168 -6.41397,-0.75048c-0.2654,0.08017 -0.54572,-0.06941 -0.62627,-0.33435c-0.07994,-0.2654 0.06971,-0.54518 0.33466,-0.62589c2.3376,-0.70928 5.24367,-0.36571 7.23055,0.85524c0.23597,0.14527 0.31052,0.45425 0.16525,0.68991l0,-0.00008zm0.06764,-1.82501c-2.0745,-1.23217 -5.49716,-1.34547 -7.47782,-0.74433c-0.31805,0.09646 -0.6544,-0.08309 -0.75079,-0.40114c-0.09638,-0.31821 0.08301,-0.65433 0.4013,-0.75102c2.27365,-0.69022 6.05334,-0.55686 8.44174,0.86101c0.28669,0.16979 0.38047,0.53926 0.2106,0.82496c-0.1691,0.28608 -0.53957,0.38039 -0.82473,0.21052l-0.00031,0z"
                  fill="#1ED760"
                />
              </g>
            </g>
          </g>
        </g>
      </SvgIcon>
    )
  }
}

export default class Spotify extends Component {
  static displayName() {
    return 'spotify'
  }

  constructor(props) {
    super(props)

    this.state = { version: 'Not running' }
    this.setStatus = this.setStatus.bind(this)

    this.handleSpotifyActivation = this.handleSpotifyActivation.bind(this)
  }

  setStatus() {
    spotify.isRunning((err, isRunning) => {
      if (!isRunning) {
        this.setState({ state: 'Not running' })
        return
      }
      if (err) {
        console.log(`Caught exception at setStatus(e): ${err}`)
      }
      spotify.getState((err, st) => {
        if (err) {
          console.log(`Caught exception at spotify.getState(e): ${err}`)
        }

        spotify.getTrack((err, track) => {
          if (err) {
            console.log(`Caught exception at spotify.getTrack(e): ${err}`)
          }
          this.setState({
            state: `${st.state === 'playing'
              ? '▶'
              : '❚❚'} ${track.artist} - ${track.name}`
          })
        })
      })
    })
  }

  /*
    TODO: Make this work on Linux and Win 32/64
   */
  handleSpotifyActivation(e) {
    e.preventDefault()
    console.log('HANDLE CLICKED FOR SPOTIFY')
    spotify.isRunning((err, isRunning) => {
      if (!isRunning) {
        spotify.openSpotify()
      }

      if (err) {
        console.log(`Caught exception at handleSpotifyActivation(e): ${err}`)
      }
    })
  }

  componentDidMount() {
    this.setStatus()
    this.interval = setInterval(() => this.setStatus(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  styles() {
    return {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        color: '#1ED760'
      }
    }
  }

  template(css) {
    return (
      <div
        className={css('wrapper')}
        onClick={this.handleSpotifyActivation.bind(this)}
      >
        <PluginIcon /> {this.state.state}
      </div>
    )
  }
}
