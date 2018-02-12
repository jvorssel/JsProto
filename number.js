"use strict";

Number.prototype.isEven = function () {
    return this % 2 === 0;
};

Number.prototype.isOdd = function () {
    return this % 2 === 1;
};

Number.prototype.round = function (trailingDecimals) {
    // Source: http://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
    const t = Math.pow(10, trailingDecimals);
    return (Math.round(this * t + (trailingDecimals > 0 ? 1 : 0) * (Math.sign(this) * (10 / Math.pow(100, trailingDecimals)))) / t)
        .toFixed(trailingDecimals);
};

Number.prototype.pad = function (amount) {
    var s = this + '';
    while (s.length < amount) s = `0${s}`;
    return s;
};