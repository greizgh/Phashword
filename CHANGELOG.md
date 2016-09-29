# 1.6.1 - 2016/09/29

* Mark add-on as multiprocess compatible

# 1.6.0 - 2016/02/15

* Add external prompt option

# 1.5.9 - 2015/10/25

* Store password length and type per website

# 1.5.8 - 2015/09/23

* Fix incompatibility with twik when using special char in master password

# 1.5.7 - 2015/09/05

* Display private key as QRcode

# 1.5.6 - 2015/07/13

* Only save site settings when needed

# 1.5.5 - 2015/06/13

* Fix bad behavior when removing a site profile

# 1.5.2 - 2015/05/26

* Fix toggle key not being taken into account before restart
* Switch to jpm

# 1.5.1 - 2015/04/06

* Emit keyboard event after password is received: fix issue with dynamic password validation

# 1.5.0 - 2015/02/01

* Add copy to clipboard button in popup
* Warn when storage quota is exceeded
* Manage site settings from backend
* Toggle phashword via context menu

# 1.4.8 - 2015/01/03

* Fix issue with phashword state not reflected on current page until reload

# 1.4.7 - 2014/12/24

* Fix issue where form submitting was prevented in some situation

# 1.4.6 - 2014/12/21

* Fix issue with firefox 36 not properly handling password fields

# 1.4.5 - 2014/12/08

* Fix AMO validation warnings

# 1.4.4 - 2014/12/05

* Fix popup design

# 1.4.3 - 2014/12/04

* Condense popup UI
* Replace password field placeholder with tag and profile name

# 1.4.2 - 2014/11/22

* Handle dynamically created password fields

# 1.4.1 - 2014/11/18

* Minor UI improvements

# 1.4.0 - 2014/11/16

* Add password generation from within popup

# 1.3.0 - 2014/11/15

* Add ability to toggle phashword per website

# 1.2.0 - 2014/11/06

* Fix form being submitted before we have an actual hash

# 1.1.0 - 2014/10/28

* Do not need jQuery anymore

# 1.0.0 - 2014/10/26

Initial release. Main features are:

* [twik](https://github.com/gustavomondron/twik) compatibility
* Use firefox internal HMAC algorithm
* Multiple profiles
* Non intrusive per field toggle
