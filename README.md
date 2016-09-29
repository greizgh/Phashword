# Phashword

Phashword is a firefox add-on making password generation and management easier.

Spiritual successor of password hasher (another firefox add-on) it is completely compatible with [Twik](https://github.com/gustavomondron/twik) on Android and twik for chrome.

## How does it work?

Phashword will generate per-site passwords based on:

1. a site-specific tag (such as "mozilla" or "github")
1. a private key (randomly generated if you lack inspiration)
1. a master key that only you know

The password will be generated using a keyed-hash message authentication code (HMAC_SHA1 for now).

## How to use Phashword?

Once installed Phashword will be active by default. It means that every password fields will be handled by phashword.
You can toggle Phashword per field by pressing "Escape" key (default, other keys available through add-on configuration).
You can also toggle Phashword per website using status checkbox in pop-up menu by clicking the Phashword icon in toolbar.
If you prefer to only enable Phashword on particular websites, then you can change its default status in add-on configuration.

## Where can I get Phashword?

Go to [firefox add-on page](https://addons.mozilla.org/fr/firefox/addon/phashword/) and click _Add to firefox_.

Or you can clone this repository and build the extension using `jpm xpi`.
See [MDN](https://developer.mozilla.org/en-US/Add-ons/SDK) for more information on firefox add-on SDK and building process.

Build steps:

    cd data
    compass compile
    cd ..
    jpm xpi

## License

Phashword is free software and is distributed under the GPLv3 license. See COPYING for more information.

## External code

* [Twik-for-chrome](https://github.com/gustavomondron/twik-for-chrome/) by gustavomondron. Distributed under GPLv3.
* [Password Hasher](https://addons.mozilla.org/en-US/firefox/addon/password-hasher/)
by Steve Cooper. Distributed under MPL 1.1/GPL 2.0/LGPL 2.1 licenses.
* [Password Hasher Plus](http://passwordhasherplus.com) by Eric Woodruff.
Distributed under MPL 1.1/GPL 2.0/LGPL 2.1 licenses.
* [TLD](https://www.npmjs.org/package/tldjs) by Thomas Parisot. Distributed under the MIT license.
