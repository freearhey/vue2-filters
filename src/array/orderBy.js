import util from '../util/index'

/**
 * Filter filter for arrays
 *
 * @param {String|Array<String>|Function} ...sortKeys
 * @param {Number} [order]
 */

function orderBy (arr) {
  var comparator = null
  var sortKeys
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
  var firstArg = args[0]
  if (!firstArg) {
    return arr
  } else if (typeof firstArg === 'function') {
    // custom comparator
    comparator = function (a, b) {
      return firstArg(a, b) * order
    }
  } else {
    // string keys. flatten first
    sortKeys = Array.prototype.concat.apply([], args)
    comparator = function (a, b, i) {
      i = i || 0
      return i >= sortKeys.length - 1
        ? baseCompare(a, b, i)
        : baseCompare(a, b, i) || comparator(a, b, i + 1)
    }
  }

  function baseCompare (a, b, sortKeyIndex) {
    var sortKey = sortKeys[sortKeyIndex]
    if (sortKey) {
      if (sortKey !== '$key') {
        if (util.isObject(a) && '$value' in a) a = a.$value
        if (util.isObject(b) && '$value' in b) b = b.$value
      }
      a = util.isObject(a) ? util.getPath(a, sortKey) : a
      b = util.isObject(b) ? util.getPath(b, sortKey) : b
      a = (typeof a === 'string') ? a.toLowerCase() : a
      b = (typeof b === 'string') ? b.toLowerCase() : b
    }
    return a === b ? 0 : a > b ? order : -order
  }

  // sort on a copy to avoid mutating original array
  return arr.slice().sort(comparator)
}

export default orderBy