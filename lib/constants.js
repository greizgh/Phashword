/*
 * Copyright 2014 Greizgh
 *
 * This file is part of Phashword.
 *
 * Foobar is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Foobar is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

var PASSWORD_TYPES = {
  SPECIAL: 1,
  ALPHANUMERIC: 2,
  NUMERIC: 3
};

exports.PASSWORD_TYPES = PASSWORD_TYPES;

/* See https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsICryptoHash#Hash_Algorithms */
var MOZ_HASH_ALGORITHMS = {
  MD2: 1,
  MD5: 2,
  SHA1: 3,
  SHA256: 4,
  SHA384: 5,
  SHA512: 6
};

exports.MOZ_HASH_ALGORITHMS = MOZ_HASH_ALGORITHMS;

exports.DEFAULT_COLOR = "#ff8020";
exports.DEFAULT_LENGTH = 12;
