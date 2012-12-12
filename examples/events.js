var util = require('util');
var events = require('events');

var clazz = require('../clazz').clazz;

var EventedGreeter = clazz('EventedGreeter').extends(events.EventEmitter).body({
    initialize: function (messageTemplate) {
        this.messageTemplate = messageTemplate;
    },

    greet: function (user) {
        var message = util.format(this.messageTemplate, user);
        this.emit('greeting', message);
        return this;
    }
});

var greeter = new EventedGreeter('Hello world of events, %s');
greeter.on('greeting', function (msg) {
    console.log(msg);
});
greeter.greet('dude');
