import util from '../util/index'

/**
 * 42 => 'nd'
 *
 * @params {Object} options
 * 
 */

function ordinal (value, options) {
  options = options || {}
  var output = ''
  var includeNumber = options.includeNumber != null ? options.includeNumber : false
  if(includeNumber === true) output += value
  var j = value % 10,
      k = value % 100

  if (j == 1 && k != 11) output += 'st'
  else if (j == 2 && k != 12) output += 'nd'
  else if (j == 3 && k != 13) output += 'rd'
  else output += 'th'

  return output
}

export default ordinal