import util from '../util/index'

/**
 * 1.2              => '120%'
 * -0.2             => '-20%'
 * 100              => '10000%'
 * 1                => '100%'
 * 0.97             => '97%'
 *
 * @param {Number} value
 * @param {Number} decimals Decimal places (default: 2)
 */
function percent(value, decimals) {
  const globalOptions = this && this.percent ? this.percent : {}
  decimals = util.exist(decimals) ? decimals : globalOptions.decimalDigits
  decimals = typeof decimals !== 'undefined' ? decimals : 0
  value = value === null || isNaN(value) ? 0 : value

  return `${(value * 100).toFixed(decimals)}%`
}

export default percent
