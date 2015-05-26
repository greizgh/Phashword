/*
 * Copyright 2014 Greizgh
 * Copyright 2014 Red Dye No. 2
 * Copyright 2010-2014 Eric Woodruff
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

var tld = require("./tld");

/* grepUrl:
   take a url and return the corresponding site tag.

   (a) split the url into parts. Discard everything except the address.
       e.g. http://www.google.com:80/mail -> www.google.com

   (b) If the address looks like an ip address or dot free hostname, then
       return it. It can be used as the site tag.
       e.g. 192.168.1.1 -> 192.168.1.1
            localhost -> localhost

   (c) Any address which does not meet (b)'s criteria is probably a domain.
       Use the tldjs library (http://github.com/oncletom/tldjs) to:
         * Cut off the registrar controled part at the end of the domain
         * Cut off any subdomains off the beginning of the domain

       e.g. google.com -> google
            google.co.uk -> google
            mail.google.co.uk -> google
            calendar.google.co.uk -> google

       This is an important step because, (using google as an example):
       The passwords used at google.com, google.co.uk, google mail,
       and google calendar, all need to be the same.

   (d) If the URL is formatted in any other way, fall back to the default
       "firefox" site tag
*/

function grepUrl (url) {
  var split_at_first_dot = /(^[^.]+)\..*$/;
  var split_url = /^(https?:\/\/)(.+@)?([^:#\/]+)(:\d{2,5})?(\/.*)?$/;
  // 1 = protocol, 2 = auth, 3 = address, 4 = port, 5 = path
  // split_url is stolen from http://github.com/oncletom/tldjs
  var is_ipv4 = /^\d{1,3}(\.\d{1,3}){3}$/;
  var is_dot_free_hostname = /^[^.]+$/;

  try {
    //if url badly formed, this will throw a type error, handled at (d)
    var address = split_url.exec(url)[3];                          // a
    if (is_ipv4.test(address) || is_dot_free_hostname.test(address)) {
      return address;                                            // b
    } else {
      //this shouldn't throw an error.
      //but just in case it does, handle it at (d)
      return split_at_first_dot.exec(tld.getDomain(address))[1]; // c
    }
  } catch (e) {
    return "firefox";                                               // d
  }
}

exports.grepUrl = grepUrl;

function generatePrivateKey() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace (/[xy]/g, function(c) {
    var r = Math.random() * 16|0;
    var v = c == 'x' ? r : (r & 0x3|0x8);
    return v.toString(16);
  }).toUpperCase();
}

exports.generatePrivateKey = generatePrivateKey;
