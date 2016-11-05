import CryptoJS from 'crypto-js';
import { PASSWORD_TYPES } from './constants';

function isDigit(char) {
  return char >= '0' && char <= '9';
}

function isAlphaOrDigit(char) {
  return isDigit(char) || (char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z');
}

function convertToDigits(input, seed, length) {
  let pivot = 0;
  const zeroChar = '0'.charCodeAt(0);
  for (let i = 0; i < length; i++) {
    if (!isDigit(input[i])) {
      const digit = String.fromCharCode((seed + input.charCodeAt(pivot)) % 10 + zeroChar);
      input  = input.substr(0, i) + digit + input.substr(i + 1);
      pivot = i + 1;
    }
  }
  return input;
}

function removeSpecialCharacters(input, seed, length) {
  let pivot = 0;
  const aChar = 'A'.charCodeAt(0);
  for (let i = 0; i < length; i++) {
    if (!isAlphaOrDigit(input[i])) {
      const char = String.fromCharCode((seed + pivot) % 26 + aChar);
      input = input.substr(0, i) + char + input.substr(i + 1);
      pivot = i + 1;
    }
  }

  return input;
}

function injectCharacter(input, offset, reserved, seed, length, cStart, cNum) {
  const pos0 = seed % length;
  const pos = (pos0 + offset) % length;
  const cStartCode = cStart.charCodeAt(0);
  for (let i = 0; i < length - reserved; i++) {
    const i2 = (pos0 + reserved + i) % length;
    const c = input.charCodeAt(i2);
    if (c >= cStartCode && c < (cStartCode + cNum)) {
      return input;
    }
  }

  const head = pos > 0 ? input.substring(0, pos) : '';
  const inject = String.fromCharCode(((seed + input.charCodeAt(pos)) % cNum) + cStartCode);
  const tail = (pos + 1 < input.length) ? input.substring(pos + 1) : '';
  return head + inject + tail;
}

function _hashPassword(tag, key, length, type) {
  let hash = CryptoJS.HmacSHA1(tag, key).toString(CryptoJS.enc.Base64);
  hash = hash.slice(0, -1); // remove trailing '=' to ensure compatibility with Twik

  let sum = 0;
  for (let i = 0; i < hash.length; i++) {
    sum += hash.charCodeAt(i);
  }

  /* Parse password to match the request type */
  if (type === PASSWORD_TYPES.NUMERIC) {
    hash = convertToDigits(hash, sum, length);
  } else {
    /* We force digits, punctuation characters and mixed case */
    // Force digits
    hash = injectCharacter(hash, 0, 4, sum, length, '0', 10);
    if (type == PASSWORD_TYPES.SPECIAL) {
      // Force special chars
      hash = injectCharacter(hash, 1, 4, sum, length, '!', 15);
    }

    // Force mixed case
    hash = injectCharacter(hash, 2, 4, sum, length, 'A', 26);
    hash = injectCharacter(hash, 3, 4, sum, length, 'a', 26);

    // Remove special chars if needed
    if (type == PASSWORD_TYPES.ALPHANUMERIC) {
      hash = removeSpecialCharacters(hash, sum, length);
    }
  }

  /* Trim the password to match the requested length */
  return hash.substring(0, length);
}

export default function hashPassword(tag, masterKey, privateKey, length, passwordType) {
  if (masterKey === '') {
    return '';
  }
  if (privateKey !== null) {
    tag = _hashPassword(privateKey, tag, 24, PASSWORD_TYPES.SPECIAL);
  }

  return _hashPassword(tag, masterKey, length, passwordType);
}
