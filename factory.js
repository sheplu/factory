// @ts-ignore
const { Worker } = require('worker_threads');
const config = require('config')
const { Foo } = require('./foo')
const { Bar } = require('./bar')
const { FooBar } = require('./foobar')

/**
 * @class
 */
class Factory {
    factoryStock = {
        'foo': [],
        'bar': [],
        'foobar': [],
        'robot': 0,
        money: 0
    }
    workers = []
    workersTask = {}

    /**
     * @constructor
     */
    constructor() {
        this.id = 0
        for (let index = 0; index < config.get('start.robot'); index++) {
            this.createRobot()
        }
    }

    /**
     * Create a new robot in a separate worker
     * @returns void
     */
    createRobot() {
        const worker = new Worker('./robot.js')
        worker.on('message', (data) => {
            this.processMessage(data)
            console.log(this.factoryStock);
            this.computeNextTask(worker, data.id)
        })
        this.workers.push(worker)
        this.factoryStock.robot++
    }

    /**
     *
     * @param {*} worker worker to communicate with
     * @param {number} id id of the worker
     * @returns void
     */
    computeNextTask(worker, id) {;
        if(!this.workersTask[id]) {
            if (this.factoryStock.money >= config.get('buy.price') && this.factoryStock.foo.length >= config.get('buy.foo')) {
                console.log('--------- NEW BUY -----------');
                const foos = []
                for (let index = 0; index < config.get('buy.foo'); index++) {
                    foos.push(this.factoryStock.foo.pop())
                }
                const send = { type: 'buy', foos }
                this.factoryStock.money -= config.get('buy.price')
                this.workersTask[id] = send
                worker.postMessage({ type: 'buy', stock: this.factoryStock })
            }
            else if (this.factoryStock.foobar.length > 0) {
                console.log('--------- NEW SELL -----------');
                const foobar = this.factoryStock.foobar.pop()
                const send = { type: 'sell', foobar }
                this.workersTask[id] = send
                worker.postMessage({ ...send,  stock: this.factoryStock })
            }
            else if (this.factoryStock.foo.length > 0 && this.factoryStock.bar.length > 0) {
                console.log('--------- NEW ASSEMBLE -----------');
                const foo = this.factoryStock.foo.pop()
                const bar = this.factoryStock.bar.pop()
                const send = { type: 'assemble', foo: foo.id, bar: bar.id }
                this.workersTask[id] = send
                worker.postMessage({ ...send,  stock: this.factoryStock })
            }
        }
    }

    /**
     * Function to process all the message sent by the worker
     * @param {object} message
     */
    processMessage(message) {
        switch (message.type) {
            case 'newFoo':
                this.factoryStock.foo.push(new Foo())
                break;
            case 'newBar':
                this.factoryStock.bar.push(new Bar())
                break;
            case 'assembleSuccess':
                console.log('success', message);
                this.factoryStock.foobar.push(new FooBar(message.foo, message.bar))
                delete this.workersTask[message.id]
                break;
            case 'assembleFailure':
                console.log('failure', message);
                this.factoryStock.bar.push(new Bar(message.bar))
                delete this.workersTask[message.id]
                break;
            case 'sellFooBar':
                this.factoryStock.money += config.get('sell.price')
                delete this.workersTask[message.id]
                break;
            case 'buyRobot':
                this.createRobot()
                delete this.workersTask[message.id]
                break;
            default:
                break;
        }
        if(this.factoryStock.robot >= config.get('victory.robot')) {
            console.log(this.factoryStock);
            // @ts-ignore
            process.exit(1)
        }
    }
}

module.exports = {
    Factory
}