# Phashword

Phashword is a firefox add-on making password generation and management easier.

Spiritual successor of password hasher (another firefox add-on) it is completely compatible with [Twik](https://github.com/gustavomondron/twik) on Android and twik for chrome.

## How does it work?

Phashword will generate per-site passwords based on:

1. a site-specific tag (such as "mozilla" or "github")
1. a private key (randomly generated if you lack inspiration)
1. a master key that only you know

The password will be generated using a keyed-hash message authentication code (HMAC_SHA1 for now).

## Building the extension

Run the following, after a checkout:

    npm install
    npm run build

You should obtain an installable _xpi_ in the `dist` directory.

## Version 2?

Phashword v2 is a major overhaul and rely on [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions)'s API.

Main goals are:

* being compatible with future versions of firefox
* being compatible with Phashword 1 data

There is no ETA for v2 landing.

## License

Phashword is free software and is distributed under the GPLv3 license. See COPYING for more information.
