'use strict';

const CryptoJS = require('crypto-js');
const constants = require('./constants');

function _hashPassword(tag, key, length, type) {
    let hash = CryptoJS.HmacSHA1(tag, key).toString(CryptoJS.enc.Base64);
    hash = hash.slice(0, -1); //remove trailing '=' to ensure compatibility with Twik

    var sum = 0;
    for (let i = 0; i < hash.length; i++) {
        sum += hash.charCodeAt(i);
    }

    /* Parse password to match the request type */
    if (type == constants.PASSWORD_TYPES.NUMERIC) {
        hash = convertToDigits(hash, sum, length);
    } else {
        /* We force digits, punctuation characters and mixed case */
        // Force digits
        hash = injectCharacter(hash, 0, 4, sum, length, '0', 10);
        if (type == constants.PASSWORD_TYPES.SPECIAL) {
            // Force special chars
            hash = injectCharacter(hash, 1, 4, sum, length, '!', 15);
        }

        // Force mixed case
        hash = injectCharacter(hash, 2, 4, sum, length, 'A', 26);
        hash = injectCharacter(hash, 3, 4, sum, length, 'a', 26);

        // Remove special chars if needed
        if (type == constants.PASSWORD_TYPES.ALPHANUMERIC) {
            hash = removeSpecialCharacters(hash, sum, length);
        }
    }

    /* Trim the password to match the requested length */
    return hash.substring(0, length);
}

function hashPassword(tag, masterKey, privateKey, length, passwordType) {
    if (privateKey !== null) {
        tag = _hashPassword(privateKey, tag, 24, constants.PASSWORD_TYPES.SPECIAL);
    }

    return _hashPassword(tag, masterKey, length, passwordType);
}

function convertToDigits(input, seed, length) {
    var pivot = 0;
    var zeroChar = '0'.charCodeAt(0);
    for (let i = 0; i < length; i++) {
        if (!isDigit(input[i])) {
            var digit = String.fromCharCode((seed + input.charCodeAt(pivot)) % 10 + zeroChar);
            input  = input.substr(0, i) + digit + input.substr(i + 1);
            pivot = i + 1;
        }
    }
    return input;
}

function removeSpecialCharacters(input, seed, length) {
    var pivot = 0;
    var aChar = 'A'.charCodeAt(0);
    for(let i = 0; i < length; i++) {
        if (!isAlphaOrDigit(input[i])) {
            var char = String.fromCharCode((seed + pivot) % 26 + aChar);
            input = input.substr(0, i) + char + input.substr(i + 1);
            pivot = i + 1;
        }
    }

    return input;
}

function injectCharacter(input, offset, reserved, seed, length, cStart, cNum) {
    var pos0 = seed % length;
    var pos = (pos0 + offset) % length;
    var cStartCode = cStart.charCodeAt(0);
    for (let i = 0; i < length - reserved; i++) {
        var i2 = (pos0 + reserved + i) % length;
        var c = input.charCodeAt(i2);
        if (c >= cStartCode && c < (cStartCode + cNum)) {
            return input;
        }
    }

    var head = pos > 0 ? input.substring(0, pos) : '';
    var inject = String.fromCharCode(((seed + input.charCodeAt(pos)) % cNum) + cStartCode);
    var tail = (pos + 1 < input.length) ? input.substring(pos + 1) : '';
    return head + inject + tail;
}

function isDigit(char) {
    return char >= '0' && char <= '9';
}

function isAlphaOrDigit(char) {
    return isDigit(char) || (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

exports.hashPassword = hashPassword;
