/*eslint-env jest*/
var spotify = require('spotify-node-applescript')

describe('spotify', () => {
  it('should open spotify', () => {
    expect(spotify.openSpotify()).not.toBeTruthy()
  })
});
