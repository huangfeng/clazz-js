# clazz-js

clazz-js is a class based programming library providing a convenient DSL to write Javascript programms in a class based
manner.

## Installation

clazz-js can be installed using [npm](https://npmjs.org/):
```
$ npm install clazz
```

## Usage

See this example to get an idea of how the code looks:

```javascript
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
```

All the functions given to ```body``` are copied to the class` prototype object. Thus all instances of a class share a
single copy of all the functions.

### Inheritance

Inheritance works completely in sync with Javascript's prototype object. The `extends` method takes a class object
as an argument and makes the clazz being in definition a subclass of the given class.

Given the example above both of the following expressions evaluate to `true`:

```javascript
consoleGreeter instanceof ConsoleGreeter
consoleGreeter instanceof Greeter
```

This also works with classes not defined using the class DSL, i.e. node's EventEmitter

```javascript
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
```

### Mixins
TODO
