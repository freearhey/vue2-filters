/**
 * Wraps a string or number with a string
 *
 * @author Bastiaan Jansen
 * @param {string | number} value to wrap
 * @param {string | number} wrap wrap string
 * @returns wrapped string
 */
const wrap = (value, wrap) => {
    return [wrap, value, wrap].join("");
};

export default wrap;
