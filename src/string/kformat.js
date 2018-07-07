/**
 *  Converts 'K' format value after thousand
 * 
 * 10100 => '10.1K'
 */

function kformat (value) {
    return value > 999 ? (value/1000)+'K' : value;
}
  
export default kformat