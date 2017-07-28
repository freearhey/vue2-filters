import converter from 'number-to-words'

/**
 * Converts a cardinal number to an ordinal number
 *
 * '2' => '2nd'
 */

function ordinal (value) {
  return converter.toOrdinal(value)
}

export default ordinal