/**
 * 
 * 12345 => $12,345.00
 *
 * @param {String|Object} sign|options
 * @param {Number|Object} decimals|options Decimal places
 */

function currency (value, symbol, decimalDigits) {
  var options = {}, thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol
  var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  if (!!symbol && symbol.constructor === Object && decimalDigits === undefined) {
    options = symbol
  } else if (!!decimalDigits && decimalDigits.constructor === Object) {
    options = decimalDigits
    options.symbol = options.symbol != null ? options.symbol : symbol
  } else {
    options.symbol = symbol
    options.decimalDigits = decimalDigits
  }
  symbol = options.symbol != null ? options.symbol : '$'
  thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ','
  decimalDigits = options.decimalDigits != null ? options.decimalDigits : 2
  symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true
  spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false
  var stringified = Math.abs(value).toFixed(decimalDigits)
  stringified = options.decimalSeparator
    ? stringified.replace('.', options.decimalSeparator)
    : stringified
  var _int = decimalDigits
    ? stringified.slice(0, -1 - decimalDigits)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? thousandsSeparator : ''))
    : ''
  var _float = decimalDigits
    ? stringified.slice(-1 - decimalDigits)
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