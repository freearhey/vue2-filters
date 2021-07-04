/**
 * Determines whether the specified callback function returns true for any element of an array.
 *
 * @author Bastiaan Jansen
 * @param {any[]} array
 * @param {*} fn
 * @returns true or false
 */
const some = (array, fn) => {
    return array.some(fn);
};

export default some;
