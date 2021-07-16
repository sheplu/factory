'use strict'

const chai = require('chai')
const utils = require('../utils')
const { expect } = chai

describe('utils', () => {
    describe('random', () => {
        it('returns a number between min and max', async () => {
            expect(utils.random(0, 10)).to.be.lessThanOrEqual(10).and.to.be.greaterThanOrEqual(0)
        })
    })
})
