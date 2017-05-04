/**
 *  Truncate at the given || default length
 *
 * 'lorem ipsum dolor' => 'lorem ipsum dol...'
 */

function truncate (value, length) {
  return (value || value === 0) ? value.substring(0, length || 15) + '...' : '';
}

export default truncate
