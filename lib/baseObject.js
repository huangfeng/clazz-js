var events = require('events');
var clazz = require('./clazz');

var ToStringMixin = clazz('ToStringMixin').body({
    toString: function () {
        return this._meta.name;
    }
});

var BaseObject = clazz('BaseObject').extends(events.EventEmitter).mixin(ToStringMixin);

module.exports = BaseObject;
