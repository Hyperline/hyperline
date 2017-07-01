/*eslint-env jest*/
import spotify from 'spotify-node-applescript'

describe('spotify', () => {
  it('should open spotify', () => {
    expect(spotify.openSpotify()).toBeUndefined()
  })
});
