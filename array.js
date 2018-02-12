"use strict";

const arrayExceptionMessages = {
    CONDITION_EXPECTED: "The condition is expected to be a function or native type instance.",
    SELECTOR_EXPECTED: "The selector is expected to be a function or property key.",
    AMOUNT_EXPECTED: "The amount is expected to be a number.",
    SINGLE_RESULT_EXPECTED: "The condition didn't return a single item.",
    CALLBACK_ARGS_OUT_OF_RANGE: "The expected range of arguments for the callback is 0, item and index."
};

Array.prototype.contains = function (item) {
    ///<summary>If the <paramref name="item"/> is found in the Array.</summary>
    return !(this.indexOf(item) < 0);
};

Array.prototype.remove = function (item) {
    ///<summary>Remove the <paramref name="item"/> from the Array.</summary>
    const index = this.indexOf(item);
    if (index < 0)
        return this;

    this.splice(index, 1);

    return this;
};


Array.prototype.foreach = function (callback) {
    ///<summary>Invoke the <paramref name="callback"/> method (item, index) for each member in the Array.</summary>

    if (callback === void 0 || callback === null || typeof (callback) !== 'function')
        throw new TypeError(arrayExceptionMessages.CONDITION_EXPECTED);

    const index = this.length;
    for (let i = 0; i < index; i++) {
        switch (callback.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(this[i]);
                break;
            case 2:
                callback(this[i], i);
                break;
            default:
                throw new Error(arrayExceptionMessages.CALLBACK_ARGS_OUT_OF_RANGE);
        }
    }

    return this;
};

Array.prototype.move = function (oldIndex, newIndex) {
    ///<summary>Move the member at the <paramref name="oldIndex"/> to the <paramref name="newIndex"/> in the Array.</summary>
    if (oldIndex > this.length || newIndex > this.length)
        throw new RangeError('The given indices are out-of-range, make sure they are within the range of the array.');

    this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
};

Array.prototype.setIndexProperty = function () {
    ///<summary>Create a $index property for each member of the Array.</summary>
    var i = this.length;
    while (i--) {
        this[i].$index = i;
    }
};

Array.prototype.allButFirst = function () {
    ///<summary>Every member except the first.</summary>
    const arr = [];
    const length = this.length;

    for (let i = 1; i < length; i++) {
        arr.push(this[i]);
    }

    return arr;
};

Array.prototype.allButLast = function () {
    ///<summary>Every member except the last.</summary>
    const arr = [];
    const length = this.length - 1;
    for (let i = 0; i < length; i++) {
        arr.push(this[i]);
    }

    return arr;
};


Array.prototype.removeIf = function (condition) {
    ///<summary>Remove the member if the <paramref name="condition"/> is met.</summary>
    if (condition === void 0 || condition === null || !condition.isFunction())
        throw new TypeError(arrayExceptionMessages.CONDITION_EXPECTED);

    var i = this.length;
    while (i--) {
        if (!condition(this[i], i))
            continue;

        this.splice(i, 1);
    }

    return this;
};

Array.prototype.none = function (selector, propertyValue) {
    ///<summary>If no member in the Array matches the given condition.</summary>
    return !this.any(selector, propertyValue);
};

Array.prototype.any = function (selector, propertyValue) {
    ///<summary>If any member in the Array matches the given condition.</summary>
    var i = this.length;

    if (selector === void 0 || selector === null)
        return this.length > 0;
    else if (selector.isFunction()) {
        while (i--) {
            if (selector(this[i]))
                return true;
        }

        return false;
    }
    else if (selector.isString() && !(propertyValue === void 0 || propertyValue === null)) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            if (this[i][selector] === propertyValue)
                return true;
        }

        return false;
    }
    else {
        while (i--) {
            if (this[i] === selector)
                return true;
        }

        return false;
    }
};

Array.prototype.all = function (selector, propertyValue) {
    ///<summary>If every member in the Array matches the given condition.</summary>
    var i = this.length;

    if (selector === void 0 || selector === null)
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    if (selector.isFunction()) {
        while (i--) {
            if (!selector(this[i]))
                return false;
        }
    }
    else if (selector.isString() && !(propertyValue === void 0 || propertyValue === null)) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            if (this[i][selector] !== propertyValue)
                return false;
        }
    }
    else {
        while (i--) {
            if (this[i] !== selector)
                return false;
        }
    }

    return true;
};

Array.prototype.single = function (condition) {
    ///<summary>Return the single member that matches the given condition or throw a Error.</summary>
    var result = null;

    if (condition === void 0 || condition === null || !condition.isFunction())
        throw new TypeError(arrayExceptionMessages.CONDITION_EXPECTED);

    var index = this.length;
    while (index--) {
        if (!condition(this[index], index))
            continue;

        if (result === null)
            result = this[index];
        else
            throw new Error(arrayExceptionMessages.SINGLE_RESULT_EXPECTED);
    }

    if (result === null)
        throw new Error(arrayExceptionMessages.SINGLE_RESULT_EXPECTED);

    return result;
};

Array.prototype.singleOrDefault = function (condition) {
    ///<summary>Return the single member that matches the given condition.</summary>
    var result = null;

    if (condition === void 0 || condition === null || !condition.isFunction())
        throw new TypeError(arrayExceptionMessages.CONDITION_EXPECTED);

    for (let i = 0; i < this.length; i++) {
        if (!condition(this[i], i))
            continue;

        if (result === null)
            result = this[i];
        else
            throw new Error(arrayExceptionMessages.SINGLE_RESULT_EXPECTED);
    }

    return result;
};

Array.prototype.first = function (condition) {
    ///<summary>Return the first member that matches the given condition.</summary>
    if (!(condition === void 0 || condition === null) && condition.isFunction()) {
        for (let i = 0; i < this.length; i++) {
            if (condition(this[i], i))
                return this[i];
        }

        return null;
    } else {
        return this.length > 0 ? this[0] : null;
    }
};

Array.prototype.last = function (condition) {
    ///<summary>Return the last member that matches the given condition.</summary>
    if (!(condition === void 0 || condition === null) && condition.isFunction()) {
        let i = this.length;
        while (i--) {
            if (condition(this[i], i))
                return this[i];
        }

        return null;
    } else {
        return this.length > 0 ? this[this.length - 1] : null;
    }
};

Array.prototype.where = function (condition) {
    ///<summary>Return a new Array of members that matches the <paramref name="condition"/>.</summary>
    const arr = [];
    const length = this.length;

    if (!(condition === void 0 || condition === null) && condition.isFunction()) {
        for (let i = 0; i < length; i++) {
            if (condition(this[i]))
                arr.push(this[i]);
        }
    } else {
        for (let i = 0; i < length; i++) {
            if (this[i] === condition)
                arr.push(this[i]);
        }
    }

    return arr;
};

Array.prototype.select = function (selector) {
    ///<summary>Select a property of each member using the <paramref name="selector"/> function or property key.</summary>
    const arr = [];
    const length = this.length;

    if (selector === void 0 || selector === null)
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    if (selector.isFunction()) {
        for (let i = 0; i < length; i++) {
            const result = selector(this[i]);
            if (!(result === void 0 || result === null))
                arr.push(result);
        }
    }
    else if (selector.isString()) {
        for (let i = 0; i < length; i++) {
            if (this[i].hasOwnProperty(selector) && !(this[i][selector] === void 0 || this[i][selector] === null))
                arr.push(this[i][selector]);
        }
    } else
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    return arr;
};

Array.prototype.take = function (amount) {
    ///<summary>Take a specific <paramref name="amount"/> of members.</summary>
    if (amount === void 0 || amount === null || !amount.isNumber())
        throw new TypeError(arrayExceptionMessages.AMOUNT_EXPECTED);

    // Force the amount to be in array range.
    amount = amount > this.length ? this.length : amount;

    const arr = [];
    for (let i = 0; i < amount; i++) {
        arr.push(this[i]);
    }

    return arr;
};

Array.prototype.skip = function (amount) {
    ///<summary>Skip a specific <paramref name="amount"/> of members at the beginning.</summary>
    if (amount === void 0 || amount === null || !amount.isNumber())
        throw new TypeError(arrayExceptionMessages.AMOUNT_EXPECTED);

    // Force the amount to be in array range.
    amount = amount > this.length ? this.length : amount;

    const arr = [];
    for (let i = amount; i < this.length; i++) {
        arr.push(this[i]);
    }

    return arr;
};

Array.prototype.sum = function (selector) {
    ///<summary>Sum value of all members using <paramref name="selector"/> function or property key.</summary>
    if (this.length === 0)
        return 0;

    var sum = 0;
    var i = this.length;

    if (selector === void 0 || selector === null) {
        while (i--) {
            const value = this[i];
            if (value.isNumber())
                sum += value;
            else if (value.isString()) {
                if (value.hasCharacter(',', '.'))
                    sum += parseFloat(value);
                else
                    sum += parseInt(value);
            }
        }
    }
    else if (selector.isFunction()) {
        while (i--) {
            const funcValue = selector(this[i]);
            if (funcValue === void 0 || funcValue === null || !funcValue.isNumber())
                continue;

            sum += funcValue;
        }
    }
    else if (selector.isString()) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            const propValue = this[i][selector];
            if (propValue === void 0 || propValue === null || !propValue.isNumber())
                continue;

            sum += propValue;
        }
    }
    else
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    return sum;
};

Array.prototype.average = function (selector) {
    ///<summary>Average value of all members using the <paramref name="selector"/> function or property key.</summary>
    if (this.length === 0)
        return 0;

    const sum = this.sum(selector);
    return sum / this.length;
};

Array.prototype.max = function (selector) {
    ///<summary>Max value of all members using the <paramref name="selector"/> function or property key.</summary>
    var max = 0, i = this.length;

    if (selector === void 0 || selector === null) {
        while (i--) {
            let value = this[i];
            if (value.isNumber())
                max = value > max ? value : max;
            else if (value.isString()) {
                if (value.hasCharacter(',', '.'))
                    value = parseFloat(value);
                else
                    value = parseInt(value);

                max = value > max ? value : max;
            }
        }
    }
    else if (selector.isFunction()) {
        while (i--) {
            const funcValue = selector(this[i]);
            if (funcValue === void 0 || funcValue === null || !funcValue.isNumber())
                continue;

            if (max < funcValue)
                max = funcValue;
        }
    }
    else if (selector.isString()) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            const propValue = this[i][selector];
            if (propValue === void 0 || propValue === null || !propValue.isNumber())
                continue;

            if (max < propValue)
                max = propValue;
        }
    }
    else
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    return max;
};

Array.prototype.min = function (selector) {
    ///<summary>Min value of all members using the <paramref name="selector"/> function or property key.</summary>
    var min = Number.MAX_VALUE, i = this.length;

    if (selector === void 0 || selector === null) {
        while (i--) {
            let value = this[i];
            if (value.isNumber())
                min = value < min ? value : min;
            else if (value.isString()) {
                if (value.hasCharacter(',', '.'))
                    value = parseFloat(value);
                else
                    value = parseInt(value);

                min = value < min ? value : min;
            }
        }
    }
    else if (selector.isFunction()) {
        while (i--) {
            const funcValue = selector(this[i]);
            if (funcValue === void 0 || funcValue === null || !funcValue.isNumber())
                continue;

            if (min > funcValue)
                min = funcValue;
        }
    }
    else if (selector.isString()) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            const propValue = this[i][selector];
            if (propValue === void 0 || propValue === null || !propValue.isNumber())
                continue;

            if (min > propValue)
                min = propValue;
        }
    }
    else
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    return min;
};

Array.prototype.distinct = function (selector) {
    ///<summary>Distinct each member using the <paramref name="selector"/> function or property key.</summary>
    const arr = [];
    var i = this.length;
    if (selector === void 0 || selector === null) {
        while (i--) {
            const value = this[i];

            if (arr.any(value))
                continue;

            arr.push(value);
        }
    }
    else if (selector.isFunction()) {
        while (i--) {
            const funcValue = selector(this[i]);

            if (arr.any(funcValue))
                continue;

            arr.push(funcValue);
        }
    }
    else if (selector.isString()) {
        while (i--) {
            if (!this[i].hasOwnProperty(selector))
                continue;

            const propValue = this[i][selector];

            if (arr.any(propValue))
                continue;

            arr.push(propValue);
        }
    }
    else
        throw new TypeError(arrayExceptionMessages.SELECTOR_EXPECTED);

    return arr;
};

Array.prototype.groupBy = function (key, fallback) {
    ///<summary>Group members using the object <paramref name="key"/> or <paramref name="fallback"/>.</summary>
    return this.reduce(function (obj, item) {
        (obj[item.getPropertyByPath(key, fallback)] = obj[item.getPropertyByPath(key, fallback)] || []).push(item);
        return obj;
    }, {});
};

Array.prototype.addRange = function (members) {
    ///<summary>Push each member of the <paramref name="members"/> array to the current array.</summary>
    for (var i = 0; i < members.length; i++) {
        var m = members[i];
        this.push(m);
    }
};

