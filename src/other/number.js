import util from '../util/index'

/**
 * 123456 => '123,456'
 *
 * @params {Object} options
 * 
 */

function number (value, format, options) {
  const globalOptions = (this && this.number) ? this.number : {}
  options = options || globalOptions
  format = util.exist(format) ? format : globalOptions.format
  const config = parseFormat(format)
  const number = parseNumber(value)
  const thousandsSeparator = options.thousandsSeparator != null ? options.thousandsSeparator : ','
  const decimalSeparator = options.decimalSeparator != null ? options.decimalSeparator : '.'

  config.sign = config.sign || number.sign

  if(config.unit) {
    const numberWithUnit = addUnit(number.float, config)
    return config.sign + numberWithUnit
  }
  
  let int = config.decimals === 0 ? toFixed(number.float, 0) : number.int
  switch(config.base) {
    case '':
      int = ''
      break
    case '0,0':
      int = addSeparator(int, thousandsSeparator)
      break
  }

  let fraction = getFraction(number.float, config.decimals, decimalSeparator)

  return config.sign + int + fraction
}

function parseNumber(num) {
  return {
    float: Math.abs(parseFloat(num)),
    int: Math.abs(parseInt(num)),
    sign: Math.sign(num) < 0 ? '-' : ''
  }
}

function parseFormat(string = '0') {
  const regex = /([\+\-])?([0-9\,]+)?([\.0-9]+)?([a\s]+)?/
  const matches = string ? string.match(regex) : ['','','','','']
  const float = matches[3]
  const decimals = float ? float.match(/0/g).length : 0

  return {
    sign: matches[1] || '',
    base: matches[2] || '',
    decimals,
    unit: matches[4] || ''
  }
}

function addUnit(num, config) {
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "K" },
    { value: 1E6, symbol: "M" }
  ]

  let i
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }

  num = (num / si[i].value).toFixed(config.decimals).replace(rx, "$1")

  return num + config.unit.replace('a', si[i].symbol)
}

function addSeparator(num, separator) {
  const regex = /(\d+)(\d{3})/
  const string = num.toString()
  const x = string.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''
  while (regex.test(x1)) {
    x1 = x1.replace(regex, '$1' + separator + '$2')
  }

  return x1 + x2
}

function getFraction(num, decimals, separator) {
  const fraction = toFixed(num, decimals).toString().split('.')[1]

  return fraction ? separator + fraction : ''
}

function toFixed(num, precision) {
  return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision)
}

export default number