/*
 * Copyright 2014 Greizgh
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

var profiles;
var site_settings;

/**
 * Update fields according to site_settings
 */
function updateFields() {
  if (site_settings && profiles) {
    document.querySelector('#tag').value = site_settings.tag;
    document.querySelector('#profile').value = site_settings.profile_index;
    var enabled = document.querySelectorAll('.enabled');
    var disabled = document.querySelectorAll('.disabled');
    if (site_settings.status) {
      for (let i=0; i<enabled.length; i++) {
        enabled[i].style.display = "inline";
      }
      for (let i=0; i<disabled.length; i++) {
        disabled[i].style.display = "none";
      }
    } else {
      for (let i=0; i<enabled.length; i++) {
        enabled[i].style.display = "none";
      }
      for (let i=0; i<disabled.length; i++) {
        disabled[i].style.display = "inline";
      }
    }
    var change = new CustomEvent('change');
    document.querySelector('#profile').dispatchEvent(change);
  }
}

/**
 * Update popup with new settings
 */
self.port.on("update_settings", function(data) {
  site_settings = data;
  updateFields();
});

self.port.on("populate", function(data) {
  profiles = data;
  document.querySelector('#profile').innerHTML = null;
  var index = 0;
  profiles.forEach(function(profile){
    document.querySelector('#profile').appendChild(new Option(profile.name, index++));
  });
  updateFields();
});

/**
 * Listen for changes in the popup and send them to main
 */
document.querySelector('#profile').addEventListener('change', function(event) {
  var index = event.target.value;
  document.querySelector('#password_length').value = profiles[index].password_length;
  document.querySelector('#password_type').value = profiles[index].password_type;
  document.querySelector('#color').style.backgroundColor = profiles[index].color;
  site_settings.profile_index = index;
  self.port.emit("update_settings", site_settings);
});
document.querySelector('#tag').addEventListener('change', function(event) {
  site_settings.tag = event.target.value;
  self.port.emit("update_settings", site_settings);
});
document.querySelector('#password_length').addEventListener('change', function(event) {
  var index = document.querySelector('#profile').value;
  profiles[index].password_length = event.target.value;
  updateProfile();
});
document.querySelector('#password_type').addEventListener('change', function(event) {
  var index = document.querySelector('#profile').value;
  profiles[index].password_type = event.target.value;
  updateProfile();
});
document.querySelector('#settings').addEventListener('click', function() {
  self.port.emit("display_settings");
});
document.querySelector('#state_btn').addEventListener('click', function() {
  site_settings.status = !site_settings.status;
  self.port.emit("update_settings", site_settings);
  updateFields();
});

/**
 * Allow user to generate hash via popup
 */
document.querySelector('#master_key').addEventListener('keyup', requestHash);
document.querySelector('#profile').addEventListener('change', requestHash);
document.querySelector('#tag').addEventListener('change', requestHash);
document.querySelector('#password_length').addEventListener('change', requestHash);
document.querySelector('#password_type').addEventListener('change', requestHash);

document.querySelector('#password').addEventListener('click', function(event) {
  event.target.select();
});

function requestHash() {
  var key = document.querySelector('#master_key').value;
  if (key !== '') {
    self.port.emit("get_hash", key);
  } else {
    document.querySelector('#password').value = null;
  }
}

self.port.on("hash", function(hash) {
  document.querySelector('#password').value = hash;
});

/**
 * Send changes to main
 */
function updateProfile() {
  var index = document.querySelector('#profile').value;
  var data = {
    profile_index: index,
    profile: profiles[index],
  };
  self.port.emit("update_profile", data);
}

// Tell main that we are ready
self.port.emit("ready");
