var expect = require('chai').expect;

var events = require('events');
var BaseObject = require(__dirname + '/../lib/baseObject');

exports.testEnsureThatObjectIsInstanceOfEventEmitter = function (test) {
    var o = new BaseObject();

    expect(o instanceof events.EventEmitter).to.be.true;

    test.done();
};

exports.testEnsureThatObjectHasFunctionalityProvidedByEventEmitter = function (test) {
    var o = new BaseObject();

    o.on('foo', function () {
        test.done();
    });

    o.emit('foo');
};

exports.testEnsureThatObjectHasFunctionalityProvidedByToString = function (test) {
    var o = new BaseObject();

    o.toString();

    test.done();
};
