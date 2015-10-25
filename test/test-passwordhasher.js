/*
 * Copyright 2014-2015 Greizgh
 *
 * This file is part of Phashword.
 *
 * Phashword is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Phashword is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Phashword.  If not, see <http://www.gnu.org/licenses/>.
 */

var pwh = require("../lib/PasswordHasher");
var passwordHasher = new pwh.PasswordHasher();

exports["test basic hashing capability"] = function(assert) {
    var password = passwordHasher.hashPassword(
        "test",       // site tag
        "master",     // master key
        "private",    // private key
        12,           // Password length
        1             // alphanumeric + special chars
    );
    assert.ok(password, "A hash is produced");
};

exports["test compatibility with twik-for-chrome"] = function(assert) {
    // Numeric password
    var password = passwordHasher.hashPassword(
        "test",       // site tag
        "master",     // master key
        "private",    // private key
        8,           // Password length
        3             // numeric
    );
    var twik = "88105589";  // Password hashed with twik
    assert.ok(password == twik, "Numeric password seem compatible with Twik");

    // Alphanumeric password
    password = passwordHasher.hashPassword(
        "test",       // site tag
        "master",     // master key
        "private",    // private key
        8,           // Password length
        2             // Alphanumeric
    );
    twik = "LL1b5Bjk";  // Password hashed with twik
    assert.ok(password == twik, "Alphanumeric password seem compatible with Twik");

    // Alphanumeric + special characters password
    password = passwordHasher.hashPassword(
        "test",       // site tag
        "master",     // master key
        "private",    // private key
        8,           // Password length
        1             // Alphanumeric + special chars
    );
    twik = "LL1!5Bjk";  // Password hashed with twik
    assert.ok(password == twik, "Special chars password seem compatible with Twik");
};

exports["test compatibility with twik and special chars"] = function(assert) {
    var password = passwordHasher.hashPassword(
        "test",
        "Ümlaut",
        "private",
        12,
        1
    );
    var twik = "kphic2eR4/*F";
    assert.ok(password == twik, "Compatible with umlauts in master key");

    password = passwordHasher.hashPassword(
        "test",
        "€uro",
        "private",
        12,
        1
    );
    twik = "gxK1KMGF7is+";
    assert.ok(password == twik, "Compatible with euro symbol in master key");

    password = passwordHasher.hashPassword(
        "test",
        "äî$Üœ",
        "private",
        12,
        1
    );
    twik = "tck5-E8vrrel";
    assert.ok(password == twik, "Compatible with several special chars in master key");

    password = passwordHasher.hashPassword(
        "Ümlaut",
        "master",
        "private",
        12,
        1
    );
    twik = "XPGfT!MmWc2X";
    assert.ok(password == twik, "Compatible with several special chars in tag");

    password = passwordHasher.hashPassword(
        "test",
        "Üœlzk",
        "Üœlzk",
        12,
        1
    );
    twik = "B766HlSaS/Gq";
    assert.ok(password == twik, "Compatible with several special chars in master and private key");
};

require("sdk/test").run(exports);
