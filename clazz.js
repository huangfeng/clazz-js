
var Class = function (name) {
    name = name || 'class';

    var clazz = function () {
        if (clazz._meta.super) {
            clazz._meta.super.call(this, null);
        }

        if (this.initialize) {
            this.initialize.apply(this, arguments);
        }

        this._meta = clazz._meta;

        return this;
    };

    clazz._meta = {
        name: name,
        super: null,
        mixins: []

    };

    clazz.body = function (body) {
        for (var key in body) {
            clazz.prototype[key] = body[key];
        }

        return clazz;
    };

    clazz.extends = function (parentClass) {
        clazz.prototype = new parentClass();
        clazz._meta.super = parentClass;

        return clazz;
    };

    clazz.mixin = function (mixinClass) {
        for (var key in mixinClass.prototype) {
            if (key !== '_meta' && key !== 'initialize') {
                clazz.prototype[key] = mixinClass.prototype[key];
            }
        }

        clazz._meta.mixins.push(mixinClass);

        return clazz;
    };

    return clazz;
};

module.exports = Class;
