'use strict'

const chai = require('chai')
const { validate } = require('uuid')
const { Foo } = require('../foo')
const { expect } = chai

describe('foo', () => {
    describe('Foo', () => {
        it('returns foo with a random id', async () => {
            const foo = new Foo()
            expect(validate(foo.id)).to.be.true
        })

        it('returns foo with a generated id even when given', async () => {
            const foo = new Foo(1234)
            expect(validate(foo.id)).to.be.true
            expect(foo.id).not.to.be.equal(1234)
        })
    })
})
