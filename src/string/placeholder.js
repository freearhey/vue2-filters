/**
 *  If the value is missing outputs the placeholder text
 * 
 * '' => {placeholder}
 * 'foo' => 'foo'
 */

function placeholder (input, property) {
  return ( input === undefined || input === '' || input === null ) ? property : input;
}

export default placeholder
