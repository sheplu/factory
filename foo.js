const { v4 } = require('uuid');

/**
 * Class defining a Foo
 * @class
 */
class Foo {
    /**
     * @constructor
     * @returns void
     */
    constructor() {
        this.id = v4()
    }
}

module.exports = {
    Foo
}