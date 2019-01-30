/**
 *  Converts a string into Capitalize
 * 
 * 'abc' => 'Abc'
 */

function capitalize (value) {
  if (!value && value !== 0) return ''
  value = value.toString().toLowerCase().split(' ')
  return value.map( item => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join(' ')
}

export default capitalize
