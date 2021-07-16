// @ts-ignore
const { parentPort } = require('worker_threads');
const { v4 } = require('uuid');
const config = require('config')
const { random } = require('./utils')

parentPort.on('message', data => {
    if(data?.stock) {
        stock = data.stock
    }
    if(data.type === 'order') {
        needBar = data.value
    }
    delete data.stock
    nextTask = data
});

let nextTask = {}
let needBar = true
let stock

class Robot {
    /**
     * @constructor
     */
    constructor() {
        console.log('new robot');
        this.task = null
        this.idRobot = v4().split('-')[0]
    }

    /**
     * The main function used to decide what the worker need to work on
     * Still a dummy worker :)
     * @returns {Promise<void>}
     */
    async brain() {
        do {
            await this.produceFoo()
            if (!stock?.bar || stock?.bar.length <  10) {
                await this.produceBar()
            }
            console.log('next', nextTask);
            if (nextTask?.type === 'assemble') {
                await this.assembleFooBar()
            }
            if (nextTask?.type === 'buy') {
                await this.buyRobot()
            }
            if (nextTask?.type === 'sell') {
                await this.sellFooBar()
            }
        } while (true);
    }

    /**
     * Function to handle the construction of a Foo
     * @returns {Promise<void>}
     */
    async produceFoo() {
        await this.moveOrContinueTask('foo')
        console.log(`#${this.idRobot} starting a foo`);
        await this.work(config.get('mineFoo.time'))
        await this.messageToParent({ id: this.idRobot, type: 'newFoo' })
        console.log(`#${this.idRobot} ending a foo`);
    }

    /**
     * Function to handle the construction of a Bar
     * @returns {Promise<void>}
     */
    async produceBar() {
        await this.moveOrContinueTask('bar')
        console.log(`#${this.idRobot} starting a bar`);
        await this.work(random(config.get('mineBar.minTime'), config.get('mineBar.maxTime')))
        await this.messageToParent({ id: this.idRobot, type: 'newBar' })
        console.log(`#${this.idRobot} ending a bar`);
    }

    /**
     * Function to handle the assembly of a foobar
     * @returns {Promise<void>}
     */
    async assembleFooBar() {
        await this.moveOrContinueTask('assemble')
        console.log(`#${this.idRobot} starting an assemble`);
        await this.work(config.get('assemble.time'))
        await this.messageToParent({
            id: this.idRobot,
            type: random(0, 100) > config.get('assemble.failureRate') ? 'assembleSuccess' : 'assembleFailure',
            foo: nextTask.foo,
            bar: nextTask.bar
        })
        console.log(`#${this.idRobot} ending an assemble`);
    }

    /**
     * Function to sell a FooBar
     * @returns {Promise<void>}
     */
    async sellFooBar() {
        await this.moveOrContinueTask('sell')
        console.log(`#${this.idRobot} starting to sell`);
        await this.work(config.get('sell.time'))
        await this.messageToParent({ id: this.idRobot, type: 'sellFooBar' })
        console.log(`#${this.idRobot} ending to sell`);
    }

    /**
     * Function to buy a new robot
     * @returns {Promise<void>}
     */
    async buyRobot() {
        await this.moveOrContinueTask('buy')
        console.log(`#${this.idRobot} starting to buy`);
        await this.messageToParent({ id: this.idRobot, type: 'buyRobot' })
        console.log(`#${this.idRobot} ending to buy`);
    }

    /**
     * Function to simulate the change of the worker between two tasks
     * @returns {Promise<void>}
     */
    async move() {
        console.log(`#${this.idRobot} starting change task`);
        await this.work(config.get('move.time'))
        console.log(`#${this.idRobot} ending change task`);
    }

    /**
     * Function to handle if the worker need to move from one task to another
     * @param {string} newTask
     * @returns {Promise<void>}
     */
    async moveOrContinueTask(newTask) {
        if (this.task != newTask) {
            await this.move()
        }
        this.task = newTask
    }

    async messageToParent(message) {
        parentPort.postMessage(message);
    }

    /**
     *
     * @param {number} ms time in millisecond to wait for the task
     * @returns {Promise<void>}
     */
    work(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms/config.get('speed'));
        });
    }
}

const robot = new Robot()
robot.brain()

module.exports = {
    Robot
}