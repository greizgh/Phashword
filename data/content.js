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

var config = {};
var elem;
var profile;

self.port.on("hash", function(hash) {
  elem.val(hash);
});

self.port.on("update_profile", function(data) {
  profile = data;
});

function requestHash(key) {
  self.port.emit("get_hash", key);
}

function handleFocus(event) {
  config.bg = $(this).css('background-color');
  config.placeholder = $(this).attr("placeholder") || '';
  if ($(this).data("phashword")) {
    $(this).css('background-color', profile.color);
    $(this).attr('placeholder', "Phashword 🔑");
    $(this).val(config.value);
  }
}

function handleBlur(event) {
  $(this).css('background-color', config.bg);
  $(this).attr("placeholder", config.placeholder);
  config.value = $(this).val();
  if ($(this).data("phashword") && $(this).val() !== '') {
    elem = $(this);
    requestHash($(this).val());
  }
}

function handleKeypress(event) {
  if (event.defaultPrevented) {
    return;
  }
  if (event.key === "Esc") {
    event.preventDefault();
    $(this).data("phashword", !$(this).data("phashword"));
    if ($(this).data("phashword")) {
      $(this).trigger("focus");
    } else {
      $(this).val('');
      $(this).trigger("blur");
      $(this).trigger("focus");
    }
  }
}

$('[type="password"]').data("phashword", true);
$('[type="password"]').on("focus", handleFocus);
$('[type="password"]').on("blur", handleBlur);
$('[type="password"]').on("keydown", handleKeypress);

$(document).ready(function() {
  self.port.emit("ready");
});
