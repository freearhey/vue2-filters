import util from '../util/index'

var endings = ['th', 'st', 'nd', 'rd']

/**
 * 42 => '42nd'
 *
 * @params
 *  A single number to be ordinalized.
 *  Numbers ending in '1' are appended with 'st'.
 *  Numbers ending in '2' are appended with 'nd'.
 *  Numbers ending in '3' are appended with 'rd'.
 *  All other numbers are appended with 'th'.
 */

function ordinalize (value) {
  return value + (endings[value % 10] || endings[0])
}

export default ordinalize