'use strict'

const chai = require('chai')
const { validate } = require('uuid')
const { Bar } = require('../bar')
const { expect } = chai

describe('bar', () => {
    describe('Bar', () => {
        it('returns bar with a random id', async () => {
            const bar = new Bar()
            expect(validate(bar.id)).to.be.true
        })

        it('returns bar with a given id', async () => {
            const bar = new Bar(1234)
            expect(bar.id).to.be.equal(1234)
        })
    })
})
