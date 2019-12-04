/**
 * 8                => '8 byte'
 * 1024             => '1.00 kb'
 * 2000000          => '1.90 MB'
 * 2000000000       => '1.86 GB'
 * 2000000000000    => '1.82 TB'
 *
 * @param {Number} valueInBytes The file size in bytes
 * @param {Number} decimals Decimal places (default: 2)
 */
function fileSize(valueInBytes, decimals = 2) {
    valueInBytes = valueInBytes === null || isNaN(valueInBytes) ? 0 : valueInBytes
    
    if (valueInBytes >= Math.pow(1024, 4)) {
        // TB
        return `${(valueInBytes / Math.pow(1024, 4)).toFixed(decimals)} TB`
    } else if (valueInBytes >= Math.pow(1024, 3)) {
        // GB
        return `${(valueInBytes / Math.pow(1024, 3)).toFixed(decimals)} GB`
    } else if (valueInBytes >= Math.pow(1024, 2)) {
        // MB
        return `${(valueInBytes / Math.pow(1024, 2)).toFixed(decimals)} MB`
    } else if (valueInBytes >= 1024) {
        // kb
        return `${(valueInBytes / 1024).toFixed(decimals)} kb`
    }
    // byte
    return `${valueInBytes} byte`
}

export default fileSize