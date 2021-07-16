'use strict'

const chai = require('chai')
const { validate } = require('uuid')
const { FooBar } = require('../foobar')
const { expect } = chai

describe('fooBar', () => {
    describe('FooBar', () => {
        it('returns foobar with a random id and foo/bar id used', async () => {
            const foobar = new FooBar(1,2)
            expect(validate(foobar.id)).to.be.true
            expect(foobar.fooId).to.be.equal(1)
            expect(foobar.barId).to.be.equal(2)
        })
    })
})
