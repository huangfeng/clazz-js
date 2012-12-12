var expect = require('chai').expect;

var clazz = require(__dirname + '/../lib/clazz');

exports.testEnsureThatObjectIsInstanceOfClass = function (test) {
    var C = clazz('Foo');

    var c = new C();
    expect(c instanceof C).to.be.true;

    test.done();
};

exports.testEnsureThatSubclassIsInstanceOfOwnClassAndParentClass = function (test) {
    var Parent = clazz('Parent');
    var Sub = clazz('Sub').extends(Parent);

    var s = new Sub();
    expect(s instanceof Sub).to.be.true;
    expect(s instanceof Parent).to.be.true;

    test.done();
};

exports.testEnsureThatObjectsHaveAccessToClassBody = function (test) {
    var C = clazz('C').body({
        foo: function () {}
    });

    var c1 = new C();

    expect(c1.foo).to.be.not.null;

    test.done();
};

exports.testEnsureThatObjectsHaveIdenticalBody = function (test) {
    var C = clazz('C').body({
        foo: function () {}
    });

    var c1 = new C();
    var c2 = new C();

    expect(c1.foo).to.be.equal(c2.foo);

    test.done();
};

exports.testEnsureThatObjectsHaveAccessToMixedInProperties = function (test) {
    var M = clazz('M').body({
        foo: function () {}
    });

    var C = clazz('C').mixin(M);

    var c1 = new C();

    expect(c1.foo).to.be.not.null;

    test.done();
};

exports.testShouldInvokeInitializeWhenConstructingObject = function (test) {
    var invoked = false;

    var C = clazz('C').body({
        initialize: function () {
            invoked = true;
        }
    });

    new C();

    expect(invoked).to.be.true;

    test.done();
}

exports.testEnsureThatSubclassConstructorInvokesSuperConstuctor = function (test) {
    var superInvoked = false;
    var subInvoked = false;

    var P = clazz('P').body({
        initialize: function () {
            superInvoked = true;
        }
    });

    var S = clazz('S').extends(P).body({
        initialize: function () {
            subInvoked = true;
        }
    });

    new S();

    expect(superInvoked).to.be.true;
    expect(subInvoked).to.be.true;

    test.done();
};
