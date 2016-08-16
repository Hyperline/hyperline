// Taken from https://github.com/zeit/hyperterm/blob/master/lib/utils/colors.js
// Effect of this script is the reverse of colors.js in hyperterm
const colorList = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'lightBlack',
  'lightRed',
  'lightGreen',
  'lightYellow',
  'lightBlue',
  'lightMagenta',
  'lightCyan',
  'lightWhite',
  'colorCubes',
  'grayscale'
];

export function getColorList( colors ) {
  // For forwards compatibility, return early if it's already an object
  if ( !Array.isArray( colors ) ) {
    return colors;
  }

  // For backwards compatibility
  const colorsList = {}
  colors.forEach( ( color, index ) => {
    colorsList[ colorList[ index ] ] = color
  } );

  return colorsList;
}
