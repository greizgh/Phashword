/*
 * Copyright 2014 Greizgh
 * Copyright 2014 Red Dye No. 2
 * Copyright 2010-2014 Eric Woodruff
 * Copyright 2006-2010 Steve Cooper
 *
 * This file is part of Twik.
 *
 * Twik is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Twik is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Twik.  If not, see <http://www.gnu.org/licenses/>.
 */

var {Cc, Ci} = require("chrome");
var constants = require("./constants");

function PasswordHasher() { }

PasswordHasher.prototype._hashPassword = function(tag, key, length, type) {
    var converter = Cc["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Ci.nsIScriptableUnicodeConverter);
    converter.charset = 'utf8';
    var dataarray = converter.convertToByteArray(tag);
    key = converter.ConvertFromUnicode(key);
    var ch = Cc["@mozilla.org/security/hmac;1"].createInstance(Ci.nsICryptoHMAC);
    var keyObject = Cc["@mozilla.org/security/keyobjectfactory;1"].getService(Ci.nsIKeyObjectFactory).keyFromString(Ci.nsIKeyObject.HMAC, key);
    ch.init(constants.MOZ_HASH_ALGORITHMS.SHA1, keyObject); // SHA1 HMAC
    ch.update(dataarray, dataarray.length);
    var hash = ch.finish(true); // get base64 hash
    hash = hash.slice(0,-1);// remove trailing '=' to ensure compatibility with Twik

    var sum = 0;
    for (let i = 0; i < hash.length; i++) {
        sum += hash.charCodeAt(i);
    }

    /* Parse password to match the request type */
    if (type == constants.PASSWORD_TYPES.NUMERIC) {
        hash = this.convertToDigits(hash, sum, length);
    } else {
        /* We force digits, punctuation characters and mixed case */
        // Force digits
        hash = this.injectCharacter(hash, 0, 4, sum, length, '0', 10);
        if (type == constants.PASSWORD_TYPES.SPECIAL) {
            // Force special chars
            hash = this.injectCharacter(hash, 1, 4, sum, length, '!', 15);
        }

        // Force mixed case
        hash = this.injectCharacter(hash, 2, 4, sum, length, 'A', 26);
        hash = this.injectCharacter(hash, 3, 4, sum, length, 'a', 26);

        // Remove special chars if needed
        if (type == constants.PASSWORD_TYPES.ALPHANUMERIC) {
            hash = this.removeSpecialCharacters(hash, sum, length);
        }
    }

    /* Trim the password to match the requested length */
    return hash.substring(0, length);
};

PasswordHasher.prototype.hashPassword = function(tag, masterKey, privateKey, length, passwordType) {
    if (privateKey !== null) {
        tag = this._hashPassword(privateKey, tag, 24, 1); //Alphanumeric + special chars
    }

    return this._hashPassword(tag, masterKey, length, passwordType);
};

PasswordHasher.prototype.convertToDigits = function(input, seed, length) {
    var pivot = 0;
    var zeroChar = '0'.charCodeAt(0);
    for (let i = 0; i < length; i++) {
        if (!this.isDigit(input[i])) {
            var digit = String.fromCharCode((seed + input.charCodeAt(pivot)) % 10 + zeroChar);
            input  = input.substr(0, i) + digit + input.substr(i + 1);
            pivot = i + 1;
        }
    }
    return input;
};

PasswordHasher.prototype.removeSpecialCharacters = function(input, seed, length) {
    var pivot = 0;
    var aChar = 'A'.charCodeAt(0);
    for(let i = 0; i < length; i++) {
        if (!this.isAlphaOrDigit(input[i])) {
            var char = String.fromCharCode((seed + pivot) % 26 + aChar);
            input = input.substr(0, i) + char + input.substr(i + 1);
            pivot = i + 1;
        }
    }

    return input;
};

PasswordHasher.prototype.injectCharacter = function(input, offset, reserved, seed, length, cStart, cNum) {
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
};

PasswordHasher.prototype.isDigit = function(char) {
    return char >= '0' && char <= '9';
};

PasswordHasher.prototype.isAlphaOrDigit = function(char) {
    return this.isDigit(char) || (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
};

exports.PasswordHasher = PasswordHasher;
