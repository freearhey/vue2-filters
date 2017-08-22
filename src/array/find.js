import filterBy from './filterBy'

/**
 * Get first matching element from a filtered array
 *
 * @param {Array} arr
 * @param {String|Number} search
 * @returns {mixed}
 */
function find(arr, search) 
{
  var array = filterBy.apply(this, arguments);
  array.splice(1);
  return array;
}

export default find;
