var assert = require ('assert');

describe('Comparing strings:', function() {
    describe('comparing the same strings', function() {
        it('should return true', function() {
            assert.strictEqual("hello", "hello");
        })
    })
    describe('comparing different strings', function() {
        it('should return false', function() {
            assert.notStrictEqual("hello", "there");
        })
    })
})