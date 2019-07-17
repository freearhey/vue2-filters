import util from '../util/index'

/**
 * 'item' => 'items'
 *
 * @param {String|Array} word
 * @param {Object} options
 *
 */

function pluralize (value, word, options) {
  const globalOptions = (this && this.pluralize) ? this.pluralize : {}
  options = options || globalOptions
  var output = ''
  var includeNumber = options.includeNumber != null ? options.includeNumber : false
  if(includeNumber === true) output += value + ' '
  if(!value && value !== 0 || !word) return output
  if(Array.isArray(word)) {
    output += word[value - 1] || word[word.length - 1]
  } else {
    output += word + (value === 1 ? '' : 's')
  }

  return output
}

export default pluralize