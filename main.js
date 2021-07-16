const { Factory } = require('./factory')

/**
 * Launch the software
 * @param {number} factoriesInstances
 * @returns void
 */
function run(factoriesInstances = 1) {
    const factories = []
    for (let index = 0; index < factoriesInstances; index++) {
        factories.push(new Factory())
    }
}

run()