'use strict';

const isFunction = function (fn) {
    return typeof fn === 'function';
};

const isArray = function (obj) {
    return typeof obj === 'object' && obj instanceof Array;
};

const isObject = function (obj) {
    return typeof obj === 'object' && isArray(obj) === false;
};

const isNumber = function (obj) {
    return typeof obj === 'number' || obj instanceof Number;
};

const isString = function (obj) {
    return typeof obj === 'string' || obj instanceof String;
};

const isBoolean = function (obj) {
    return typeof obj === 'boolean';
};

const isNull = function (obj) {
    return obj === null || obj === void 0;
};

const isDate = function (obj) {
    return obj instanceof Date || Object.prototype.toString.call(obj) === '[object Date]';
};

const isGuid = function (obj) {
    const pattern = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

    if (isNull(obj) || obj === 0)
        return false;

    return pattern.test(obj);
};

Object.defineProperty(Object.prototype, 'isEmptyArray', {
    enumerable: false,
    value: function () { return this.isArray() && this.length <= 0; }
});


Object.defineProperty(Object.prototype, 'isEmptyObject', {
    enumerable: false,
    value: function () { return this.isObject() && Object.keys(this).length <= 0; }
});


Object.defineProperty(Object.prototype, 'isArray', {
    enumerable: false,
    value: function () { return Array.isArray(this); }
});


Object.defineProperty(Object.prototype, 'isFunction', {
    enumerable: false,
    value: function () { return typeof this === 'function'; }
});


Object.defineProperty(Object.prototype, 'isString', {
    enumerable: false,
    value: function () { return typeof this === 'string' || this instanceof String; }
});

Object.defineProperty(Object.prototype, 'isNumber', {
    enumerable: false,
    value: function () { return typeof this === 'number' || this instanceof Number; }
});


Object.defineProperty(Object.prototype, 'isFloat', {
    enumerable: false,
    value: function () { return Number(this) === this && this % 1 !== 0; }
});

Object.defineProperty(Object.prototype, 'isBoolean', {
    enumerable: false,
    value: function () { return typeof this === 'boolean'; }
});


Object.defineProperty(Object.prototype, 'isObject', {
    enumerable: false,
    value: function () { return typeof this === 'object'; }
});


Object.defineProperty(Object.prototype, 'isValidDate', {
    enumerable: false,
    value: function () {
        if (isNull(this))
            return false;

        if (Object.prototype.toString.call(this) === '[object Date]') {
            return !isNaN(this.getTime());
        } else {
            return new Date(this).isValidDate();
        }
    }
});

Object.defineProperty(Object.prototype, 'getPropertyByPath', {
    enumerable: false,
    value: function (path, fallback) {
        if (isNull(this))
            return null;

        const split = path.split('.');
        let current = this[split[0]];
        let index = 1;
        while (current.hasOwnProperty(split[index]) && index < split.length) {
            current = current[split[index]];
            index++;
        }

        if (index === split.length)
            return current;
        else if (!isNull(fallback) && fallback.isString() && this.hasOwnProperty(fallback))
            return this[fallback];
        else
            return 'other';
    }
});


Object.defineProperty(Object.prototype, 'isGuid', {
    enumerable: false,
    value: function (value) {
        return isGuid(value.toString());
    }
}); 