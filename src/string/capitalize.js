/**
 *  Converts a string into Capitalize
 * 
 * 'abc' => 'Abc'
 * 
 * @param {Object} options
 */

function capitalize (value, options) {
  const globalOptions = (this && this.capitalize) ? this.capitalize : {}
  options = options || globalOptions
  var onlyFirstLetter = options.onlyFirstLetter != null ? options.onlyFirstLetter : false
  if (!value && value !== 0) return ''
  if(onlyFirstLetter === true) {
    return value.toString().charAt(0).toUpperCase() + value.toString().slice(1)
  } else {
    value = value.toString().toLowerCase().split(' ')
    return value.map(function(item) {
      return item.charAt(0).toUpperCase() + item.slice(1)
    }).join(' ')
  }
}

export default capitalize
