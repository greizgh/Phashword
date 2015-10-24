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

var profiles;
var site_settings;
var fields = {
    tag: document.querySelector('#tag'),
    profile: document.querySelector('#profile'),
    state: document.querySelector('#state'),
    color: document.querySelector('#color'),
    password_length: document.querySelector('#password_length'),
    password_type: document.querySelector('#password_type'),
    settings: document.querySelector('#settings'),
    master_key: document.querySelector('#master_key'),
    copy: document.querySelector('#copy'),
    password: document.querySelector('#password'),
};

/**
 * Update fields according to site_settings
 */
function updateFields() {
    if (site_settings && profiles) {
        fields.tag.value = site_settings.tag;
        fields.profile.value = site_settings.profile_index;
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
        fields.state.checked = site_settings.status;
        var change = new CustomEvent('change');
        fields.profile.dispatchEvent(change);
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
    fields.profile.innerHTML = null;
    var index = 0;
    profiles.forEach(function(profile){
        fields.profile.appendChild(new Option(profile.name, index++));
    });
    updateFields();
});

/**
 * Listen for changes in the popup and send them to main
 */
fields.profile.addEventListener('change', function(event) {
    var index = event.target.value;
    fields.password_length.value = profiles[index].password_length;
    fields.password_type.value = profiles[index].password_type;
    fields.color.style.backgroundColor = profiles[index].color;
    site_settings.profile_index = index;
    self.port.emit("update_settings", site_settings);
});
fields.tag.addEventListener('change', function(event) {
    site_settings.tag = event.target.value;
    self.port.emit("update_settings", site_settings);
});
fields.password_length.addEventListener('change', function(event) {
    var index = fields.profile.value;
    profiles[index].password_length = event.target.value;
    updateProfile();
});
fields.password_type.addEventListener('change', function(event) {
    var index = fields.profile.value;
    profiles[index].password_type = event.target.value;
    updateProfile();
});
fields.settings.addEventListener('click', function() {
    self.port.emit("display_settings");
});
fields.state.addEventListener('click', function(event) {
    site_settings.status = !site_settings.status;
    self.port.emit("update_settings", site_settings);
    updateFields();
});

/**
 * Allow user to generate hash via popup
 */
fields.master_key.addEventListener('keyup', requestHash);
fields.profile.addEventListener('change', requestHash);
fields.tag.addEventListener('change', requestHash);
fields.password_length.addEventListener('change', requestHash);
fields.password_type.addEventListener('change', requestHash);

fields.password.addEventListener('click', function(event) {
    event.target.select();
});

fields.copy.addEventListener('click', function(event) {
    self.port.emit("copy", fields.password.value);
    fields.master_key.value = '';
    fields.password.value = '';
});

function requestHash() {
    var key = fields.master_key.value;
    if (key !== '') {
        self.port.emit("get_hash", key);
    } else {
        fields.password.value = null;
    }
}

self.port.on("hash", function(hash) {
    fields.password.value = hash;
});

/**
 * Send changes to main
 */
function updateProfile() {
    var index = fields.profile.value;
    var data = {
        profile_index: index,
        profile: profiles[index],
    };
    self.port.emit("update_profile", data);
}

self.port.on("get_size", function() {
    var size = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    };
    self.port.emit("resize", size);
});

self.port.on("hide", function() {
    fields.password.value = '';
    fields.master_key.value = '';
});

// Tell main that we are ready
self.port.emit("ready");
