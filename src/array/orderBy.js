import util from '../util/index'

/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy (arr) {
  var comparator = null
  var sortKey
  arr = util.convertArray(arr)

  // determine order (last argument)
  var args = util.toArray(arguments, 1)
  var order = args[args.length - 1]
  if (typeof order === 'number') {
    order = order < 0 ? -1 : 1
    args = args.length > 1 ? args.slice(0, -1) : args
  } else {
    order = 1
  }

  // determine sortKeys & comparator
  var firstArg = sortKey = args[0]
  if (!firstArg) {
    return arr
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order
    }
  } else {
    comparator = function (a, b) {
      return baseCompare(a, b)
    }
  }

  function baseCompare(a, b) {
    if (sortKey) {
      if (a[sortKey] > b[sortKey]) {
        return order
      }
      if (a[sortKey] < b[sortKey]) {
        return -order
      }
      return 0
    }
    return a === b ? 0 : a > b ? order : -order
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator)
}

export default orderBy