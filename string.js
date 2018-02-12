'use strict';

/**
 * @summary Simple regex check if the string is visibly empty.
 * @returns {boolean} The boolean result.
 */
String.prototype.isVisiblyEmpty = function () {
    ///<summary>Simple regex check if the string is visibly empty.</summary>
    const regex = /^([\r\t\n ]+)$/g;
    return regex.test(this);
};

/**
 * @summary Format the string with given arguments.
 * @returns {string} The formatted string 
 */
String.prototype.format = function () {
    var args = Array.prototype.slice.call(arguments);

    // The user passed an array.
    if (args.length === 1 && (args[0] === void 0 || args[0] === null) && args[0].isArray()) {
        args = args[0];
    }

    if (args.length === 2 && typeof args[1] === 'object') {
        args = args[1];
    }

    const result = this.replace(/{([^}]+)}/g, function (match, number) {
        var replaceWith = args[parseInt(number)];
        if (replaceWith === void 0 || replaceWith === null)
            replaceWith = '';

        return replaceWith;
    });

    return result;
};

String.prototype.removeTrailingWhitespaces = function () {
    let str = this;

    while (str.indexOf('  ') > -1) {
        str = str.replace('  ', ' ');
    }

    return str;
};

/**
 * @summary Capitalizes the first occurance of a character in a String.
 * @returns {string} The string with the first character capitalized. 
 */
String.prototype.capitalize = function () {
    if (this.isString() && this !== '') {
        const characters = this.substr(0, 1).toUpperCase() + this.substr(1);
        return characters.toString();
    }

    return this;
};

/**
 * @summary If this string contains any of the given characters.
 * @returns {boolean} The result.  
 */
String.prototype.hasCharacter = function () {
    const characters = Array.prototype.slice.call(arguments);
    return characters.any(function (char) {
        return this.indexOf(char) > -1;
    });
};

/**
 * @summary Get the indices of a character in the string.
 * @param {string} character The single character to look for.
 * @returns {Array<number>} The array of indices. 
 */
String.prototype.getCharacterIndices = function (character) {
    const indices = [];
    if (character.isEmpty())
        return indices;

    if (character.length > 1)
        throw new TypeError('The character string may only contains 1 character.');

    var i = this.length;
    while (i--) {
        if (this[i] === character)
            indices.push(i);
    }

    return indices;
};

/**
 * @summary Count the occurrences of a character in a string.
 * @param {string} character The single character to look for.
 * @returns {number} The amount of occurrences.
 */
String.prototype.countCharacter = function (character) {
    var amount = 0;
    if (character.isEmpty())
        return amount;

    if (character.length > 1)
        throw new TypeError('The character string may only contains 1 character.');

    var i = this.length;
    while (i--) {
        if (this[i] === character)
            amount++;
    }

    return amount;
};

/**
 * @summary Check if the string is Numeric.
 * @returns {boolean} If the string is Numeric.
 */
String.prototype.isNumeric = function () {
    return /^([\d,.]*)$/g.test(this);
};

/**
 * @summary If the string contains a character.
 * @param {string} character The character to check for.
 * @returns {boolean} If the string contains the character. 
 */
String.prototype.hasCharacter = function () {
    const args = Array.prototype.slice.call(arguments);
    var i = args.length;

    while (i--) {
        const arg = args[i];
        if (this.indexOf(arg) > -1)
            return true;
    }

    return false;
};

/**
 * @summary Check if the string contains a value.
 * @param {string} contains The text to look for.
 * @returns {boolean} If the string contains the text. 
 */
String.prototype.contains = function (contains) {
    return this.indexOf(contains) > -1;
};

/**
 * @summary Hash the String.
 * @returns {string} The hashed String. 
 */
String.prototype.hashCode = function () {
    var hash = 0;
    if (this.length === 0)
        return hash;

    for (let i = 0; i < this.length; i++) {
        const character = this.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash;
    }

    return hash;
};

/**
 * @summary Inserts a value at a specific index.
 * @param {number} index The index to insert the value at.
 * @param {string} insertValue The value to insert.
 * @returns {string} The string with the value inserted. 
 */
String.prototype.insertAt = function (index, insertValue) {
    return this.substr(0, index) + insertValue + this.substr(index);
};

/**
 * @summary Truncate the string to a specific length
 * @param {number} length The length to truncate the string to.
 * @returns {string} The string with the specified length. 
 */
String.prototype.truncate = function (length) {
    return this.substring(0, length);
};

/**
 * @summary If the beginning of the string is equal to the prefix.
 * @param {string} value The string to check.
 * @param {string} prefix The value to look for.
 * @returns {boolean} If beginning end of the string is equal to the prefix.
 */
String.prototype.startsWith = function (prefix) {
    return this.indexOf(prefix) === 0;
};

/**
 * @summary If the end of the string is equal to the suffix.
 * @param {string} value The string to check.
 * @param {string} suffix The value to look for.
 * @returns {boolean} If the end of the string is equal to the suffix.
 */
String.prototype.endsWith = function (suffix) {
    return this.match(suffix + '$') === suffix;
};

/**
 * @summary Decodes html unicode.
 * @returns {string} The decoded value. 
 */
String.prototype.decodeHtml = function () {
    const text = decodeURI(this);

    const parser = new DOMParser;
    const dom = parser.parseFromString(`<!doctype html><body>${text}`, 'text/html');
    return dom.body.textContent;
};

/**
 * @summary Remove newline returns from a string.
 * @param {string} value The source string.
 * @returns {string} The string without newline returns. 
 */
String.prototype.removeNewLineReturn = function () {
    return this.toString().replace(/(\r\n|\n|\r)/gm, '');
};

/**
 * @summary Simply remove each occurence of a text.
 * @param {string} text The text to remove.
 * @returns {string}  The string without the text.
 */
String.prototype.remove = function (text) {
    return this.replace(text, '');
};

/**
 * @summary Count the occurrences of the text in a string.
 * @param {string} text The text to count.
 * @returns {number} The amount of occurrences.
 */
String.prototype.count = function (text) {
    if (text === void 0 || text === null || text === '' || typeof (text) !== 'string')
        throw new TypeError(`The string '${text}' is expected to be a string.`);

    return (this.match(new RegExp(text, "g")) || []).length;
};