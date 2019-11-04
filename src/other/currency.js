import util from '../util/index'

/**
 * 
 * 12345 => $12,345.00
 *
 * @param {String} symbol
 * @param {Number} decimals Decimal places
 * @param {Object} options
 */

function currency (value, symbol, decimals, options) {
  const globalOptions = (this && this.currency) ? this.currency : {}
  symbol = util.exist(symbol) ? symbol : globalOptions.symbol
  decimals = util.exist(decimals) ? decimals : globalOptions.decimalDigits
  options = options || globalOptions
  var thousandsSeparator, symbolOnLeft, spaceBetweenAmountAndSymbol, showPlusSign
  var digitsRE = /(\d{3})(?=\d)/g
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  symbol = (typeof symbol !== 'undefined') ? symbol : '$'
  decimals = (typeof decimals !== 'undefined') ? decimals : 2
  thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ','
  symbolOnLeft = options.symbolOnLeft != null ? options.symbolOnLeft : true
  spaceBetweenAmountAndSymbol = options.spaceBetweenAmountAndSymbol != null ? options.spaceBetweenAmountAndSymbol : false
  showPlusSign = options.showPlusSign != null ? options.showPlusSign : false
  var number = Math.abs(value)
  var stringified = toFixed(number, decimals)
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
  var plusSign = (value > 0 && showPlusSign) ? '+' : ''
  return plusSign + sign + symbol
}

function toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}

export default currency