import util from '../util/index'

/**
 * 12               => '12%'
 * 100              => '100%'
 * 1000             => '1000%'
 * 0.97             => '97%'
 *
 * @param {Number} value
 * @param {Number} decimals Decimal places (default: 2)
 */
function percent(value, decimals) {
    const globalOptions = (this && this.percent) ? this.percent : {}
    decimals = util.exist(decimals) ? decimals : globalOptions.decimalDigits
    decimals = (typeof decimals !== 'undefined') ? decimals : 0
    value = value === null || isNaN(value) ? 0 : value
    
    if(value <= 1) {
        return `${(value * 100).toFixed(decimals)}%`
    }
    
    return `${value.toFixed(decimals)}%`
}

export default percent