/**
 * Converts a string to UPPERCASE
 * 
 * 'abc' => 'ABC'
 */

function uppercase (value) {
  return (value || value === 0)
    ? value.toString().toUpperCase()
    : ''
}

export default uppercase