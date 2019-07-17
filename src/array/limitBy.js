import util from '../util/index'

/**
 * Limit filter for arrays
 *
 * @param {Number|Array} arr (If Number, decimal expected)
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy (arr, n, offset) {
  arr = (util.isArray(arr)) ? arr : util.convertRangeToArray(arr)

  offset = offset ? parseInt(offset, 10) : 0
  n = util.toNumber(n)
  return typeof n === 'number'
    ? arr.slice(offset, offset + n)
    : arr
}

export default limitBy