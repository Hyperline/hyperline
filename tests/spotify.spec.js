/* eslint-env jest */
import spotify from 'spotify-node-applescript'

describe('spotify', () => {
  it('spotify should play music', () => {
    expect(spotify.play()).toBeUndefined()
  })
})
