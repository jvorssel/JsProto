"use strict";

Date.prototype.addHours = function (hours) {
    /// <summary>Add an amount of hours to a date.</summary>
    this.setHours(this.getHours() + hours);
};

Date.prototype.addMinutes = function (minutes) {
    /// <summary>Add an amount of minutes to a date.</summary>
    this.setMinutes(this.getMinutes() + minutes);
};

Date.prototype.addSeconds = function (seconds) {
    /// <summary>Add an amount of seconds to a date.</summary>
    this.setSeconds(this.getSeconds() + seconds);
};

Date.prototype.isToday = function () {
    /// <summary>Add an amount of hours to a date.</summary>
    return this.toDateString() === new Date(Date.now()).toDateString();
};

Date.prototype.getDateDifference = function (date) {
    /// <summary>Get the interval between two dates.</summary>

    if (!(date instanceof Date))
        date = new Date(date);

    var diff = date.getTime() - this.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);

    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);

    const seconds = Math.floor(diff / 1000);

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};

Date.prototype.getDaysInMonth = function (year, month) {
    const date = new Date(year, month - 1, 1);
    const result = [];
    while (date.getMonth() === month - 1) {
        result.push(date.getDate());
        date.setDate(date.getDate() + 1);
    }

    return result;
};
