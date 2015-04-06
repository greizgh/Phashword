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

var config = {};
var elem;
var hash_request = false;
var submit = false;
var profile;
var site_settings = {
  status: self.options.status
};
var current_status = site_settings.status;
var toggle_key = self.options.key;

self.port.on("hash", function(hash) {
  elem.value = hash;
  elem.dispatchEvent(new KeyboardEvent('keydown'));
  elem.dispatchEvent(new KeyboardEvent('keypress'));
  elem.dispatchEvent(new KeyboardEvent('keyup'));
  hash_request = false;
  if (submit) {
    submit = false;
    var submission = new CustomEvent('submit');
    elem.form.dispatchEvent(submission);
  }
});

self.port.on("update_profile", function(data) {
  profile = data.profile;
  site_settings = data.site_settings;
  if (site_settings.status != current_status) {
    current_status = site_settings.status;
    if (site_settings.status === false) {
      disableHooks();
    } else {
      enableHooks();
    }
  }
});

self.port.on("update_prefs", function(data) {
  toggle_key = data.key;
});

function requestHash(key) {
  self.port.emit("get_hash", key);
  hash_request = true;
}

function handleFocus(event) {
  var field = event.target;
  if (field.type === "password") {
    config.bg = field.style.backgroundColor;
    config.placeholder = field.getAttribute("placeholder") || '';
    if (!field.dataset.phashword) {
      field.dataset.phashword = String(site_settings.status);
    }
    if (field.dataset.phashword === "true") {
      field.style.backgroundColor = profile.color;
      field.setAttribute('placeholder', profile.name + ' - ' + site_settings.tag);
      field.value = config.value || '';
    }
  }
}

function handleBlur(event) {
  var field = event.target;
  if (field.type === "password") {
    field.style.backgroundColor = config.bg;
    field.setAttribute("placeholder", config.placeholder);
    config.value = field.value;
    if (field.dataset.phashword === "true" && field.value !== '') {
      elem = field;
      requestHash(field.value);
    }
  }
}

function handleKeypress(event) {
  if (event.defaultPrevented) {
    return;
  }
  var field = event.target;
  if (field.type === "password") {
    if (event.key === toggle_key) {
      event.preventDefault();
      if (field.dataset.phashword === "true") {
        field.dataset.phashword = "false";
      } else {
        field.dataset.phashword = "true";
      }
      var focus = new CustomEvent('focus');
      if (field.dataset.phashword === "true") {
        field.dispatchEvent(focus);
      } else {
        field.value = '';
        var blur = new CustomEvent('blur');
        field.dispatchEvent(blur);
        field.dispatchEvent(focus);
      }
    } else if (event.key === "Enter") {
      if (field.dataset.phashword === "true" && field.value !== '') {
        event.preventDefault();
        elem = field;
        requestHash(field.value);
        submit = true;
      }
    }
  }
}

function handleSubmit(event) {
  if (hash_request) {
    // Flag for submission on hash reception
    submit = true;
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

function enableHooks() {
  document.addEventListener('focus', handleFocus, true);
  document.addEventListener('blur', handleBlur, true);
  document.addEventListener('keydown', handleKeypress);
  document.addEventListener('submit', handleSubmit);
}

function disableHooks() {
  var el = document.activeElement;
  if (el.mozMatchesSelector('input[type="password"]')) {
    el.value = '';
    var blur = new CustomEvent('blur');
    el.dispatchEvent(blur);
  }
  document.removeEventListener('focus', handleFocus, true);
  document.removeEventListener('blur', handleBlur, true);
  document.removeEventListener('keydown', handleKeypress);
  document.removeEventListener('submit', handleSubmit);
}

document.addEventListener('DOMContentLoaded', function() {
  if (site_settings.status) {
    enableHooks();
  }
  self.port.emit("ready");
});
