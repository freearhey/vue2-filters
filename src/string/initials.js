/**
 *  Convert person name and second name to capitalised first letters
 * 
 * 'John Smith' => 'J S'
 * 'J. Smith' => 'J S'
 * 'Tedd' => 'T'
 * 'Anna Marie Christina de Ville' => 'A M'
 */

function initials (input) {
  if(input === undefined || input === '' ) return '';
  let str;
  const words = input.split(' ');
  return words[0][0].toString().toUpperCase() + (words[1] ? (' ' + words[1][0].toString().toUpperCase()) : '');
}

export default initials
