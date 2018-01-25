/**
 * 
 * 12345 => $12,345.00
 *
 * @param {String} symbol
 * @param {Number} decimals Decimal places
 * @param {Object} options
 */

function currency (value, symbol, decimals, options) {
  var thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol
  var digitsRE = /(\d{3})(?=\d)/g
  options = options || {}
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  symbol = symbol != null ? symbol : '$'
  decimals = decimals != null ? decimals : 2
  thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ','
  symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true
  spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false
  var stringified = Math.abs(value).toFixed(decimals)
  stringified = options.decimalSeparator
    ? stringified.replace('.', options.decimalSeparator)
    : stringified
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  symbol = spaceBetweenAmountAndSymbol
    ? (symbolOnLeft ? symbol + ' ' : ' ' + symbol)
    : symbol
  symbol = symbolOnLeft
    ? symbol + head +
      _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float
    : head +
      _int.slice(i).replace(digitsRE, '$1' + thousandsSeparator) + _float + symbol
  var sign = value < 0 ? '-' : ''
  return sign + symbol
}

export default currency