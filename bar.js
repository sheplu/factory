const { v4 } = require('uuid');

/**
 * Class defining a Bar
 * @class
 */
class Bar {
    /**
     * @param {*} id
     * @returns void
     */
    constructor(id) {
        this.id = id || v4()
    }
}

module.exports = {
    Bar
}