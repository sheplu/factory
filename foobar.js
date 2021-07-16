const { v4 } = require('uuid');

/**
 * Class defining a FooBar
 * @class
 */
class FooBar {
    /**
     * @constructor
     * @param {*} foo id of the foo used
     * @param {*} bar id of the bar used
     * @returns void
     */
    constructor(foo, bar) {
        this.id = v4()
        this.fooId = foo
        this.barId = bar
    }
}

module.exports = {
    FooBar
}