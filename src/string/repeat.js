/**
 * Repeats a given value an x amount of times
 *
 * @author Bastiaan Jansen
 * @param {string | number} value to repeat
 * @param {number} amount
 * @returns repeated string
 */
const repeat = (value, amount) => {
    return String(value) ? value.repeat(amount) : "";
};

export default repeat;
