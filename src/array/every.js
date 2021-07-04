/**
 * Determines whether all the members of an array satisfy the specified test.
 *
 * @author Bastiaan Jansen
 * @param {any[]} array
 * @param {*} fn
 * @returns true or false
 */
const some = (array, fn) => {
    return array.every(fn);
};

export default some;
