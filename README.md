# Phashword

Phashword is a firefox addon making password generation and management easier.

Spiritual successor of password hasher (another firefox addon) it is completely compatible with [Twik](https://github.com/gustavomondron/twik) and twik for chrome.

## How does it work?

Phashword will generate per-site passwords based on:

1. a site-specific tag (such as "mozilla" or "github")
1. a private key (randomly generated if you lack inspiration)
1. a master key that only you know

The password will be generated using a keyed-hash message authentication code (HMAC_SHA1 for now).

## How to use Phashword?

Once installed Phashword will handle every password fields. Phashword can be toggled per field by pressing "Escape" key.

## License

Phashword is free software and is distributed under the GPLv3 license. See COPYING for more information.

## External code

* [Twik-for-chrome](https://github.com/gustavomondron/twik-for-chrome/) by gustavomondron. Distributed under GPLv3.
* [Password Hasher](https://addons.mozilla.org/en-US/firefox/addon/password-hasher/)
by Steve Cooper. Distributed under MPL 1.1/GPL 2.0/LGPL 2.1 licenses.
* [Password Hasher Plus](http://passwordhasherplus.com) by Eric Woodruff.
Distributed under MPL 1.1/GPL 2.0/LGPL 2.1 licenses.
* [TLD](https://www.npmjs.org/package/tldjs) by Thomas Parisot. Distributed under the MIT license.
