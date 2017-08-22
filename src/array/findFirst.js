import filterBy from './filterBy'
import first from '../other/first'

/**
 * Get first matching element from a filtered array
 *
 * @param {Array} arr
 * @param {String|Number} search
 * @returns {mixed}
 */
function findFirst (arr, search) {
    var array = filterBy(arr, search);
    return first(array);
}

export default findFirst;
