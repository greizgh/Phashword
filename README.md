# Phashword

Phashword aims to be a convenient password manager that doesn't get in your way.

Imrove your security by using strong and unique passwords per website.
Phashword achieve this by generating passwords from:

1. a tag (usually the website name)
1. a secret (stored in your browser, back it up!)
1. a master password only known by you

It doesn't get in your way:

* enable phashword only for some websites
* disable it per field (try pressing the "Escape" key!)

## On the go?

Phashword is fully compatible with [Twik](https://github.com/gustavomondron/twik) for Android.

## Building the extension

[![Build Status](https://travis-ci.org/greizgh/Phashword.svg?branch=master)](https://travis-ci.org/greizgh/Phashword)

You will need some tools: [npm](https://www.npmjs.com/get-npm), [web-ext](https://github.com/mozilla/web-ext) and optionally [yarn](https://yarnpkg.com/).

Run the following, after a checkout:

    yarn/npm install
    npm run build:release
    web-ext build -s dist

You should obtain an installable _zip_ in the `web-ext-artifacts/` directory.

## License

Phashword is free software and is distributed under the GPLv3 license. See COPYING for more information.
