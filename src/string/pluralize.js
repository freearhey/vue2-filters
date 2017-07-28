import pluralizeJS from 'pluralize'

/**
 * 'item' => 'items'
 *
 * @param {Number} amount The number to use as a reference to produce the plural or singular of the input string
 * @param {Boolean} prependAmount Whether to prepend the amount onto the input string
 */

function pluralize (value, amount, prependAmount) {
  if( !value || typeof value !== 'string' ) return ''
  value = pluralizeJS.isSingular(value) ? value : pluralizeJS.singular(value)
  amount = amount || 2
  prependAmount = prependAmount || false
  return pluralizeJS(value, amount, prependAmount)
}

export default pluralize