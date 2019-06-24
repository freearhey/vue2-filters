import util from '../util/index'

/**
 * Limit filter for arrays
 *
 * @param {Number|Array} range (If Number, decimal expected)
 * @param {Number} n
 * @param {Number} offset (Decimal expected)
 */

function limitBy (range, n, offset) {
  const array = util.convertRangeToArray(range)

  offset = offset ? parseInt(offset, 10) : 0
  n = util.toNumber(n)
  return typeof n === 'number'
    ? array.slice(offset, offset + n)
    : array
}

export default limitBy