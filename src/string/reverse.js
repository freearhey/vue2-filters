/**
 * Reverses a string
 *
 * @author Bastiaan Jansen
 * @param {string} value
 * @returns reversed string
 */
const reverse = (value) => {
    return Array.from(value).reverse().join("");
};

export default reverse;
