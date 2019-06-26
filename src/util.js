
const util = {};

util.isString = (v) => {
    // 'hello' === new String('hello') // false
    // 'hello' == new String('hello'); // true
    return v instanceof String || typeof v == "string"
};

export default util;
