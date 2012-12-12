var util = require('util');
var clazz = require('../clazz').clazz;

var Greeter = clazz('Greeter').body({
    initialize: function (messageTemplate) {
        this.messageTemplate = messageTemplate;
    },

    greeting: function (user) {
        return util.format(this.messageTemplate, user);
    }
});

var greeter = new Greeter('Hello world, %s!');
console.log(greeter.greeting('howdy'));

var ConsoleGreeter = clazz('ConsoleGreeter').extends(Greeter).body({
    sayHello: function (user) {
        console.log(this.greeting(user));
    }
});

var consoleGreeter = new ConsoleGreeter('Hello world, %s!');
consoleGreeter.sayHello('dude');

console.log(consoleGreeter instanceof ConsoleGreeter);
console.log(consoleGreeter instanceof Greeter);
