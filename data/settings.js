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

self.port.on("populate", function(data) {
    document.querySelector('#profile').innerHTML = null;
    profiles = data;
    var index = 0;
    profiles.forEach(function(profile){
        document.querySelector('#profile').appendChild(new Option(profile.name, index++));
    });
    document.querySelector('#profile').value = 0; // Default profile
    var change = new CustomEvent('change');
    document.querySelector('#profile').dispatchEvent(change);
});

/**
 * Update fields on profile selection
 */
document.querySelector('#profile').addEventListener('change', function(event) {
    var index = event.target.value;
    document.querySelector('#name').value = profiles[index].name;
    document.querySelector('#private_key').value = profiles[index].private_key;
    document.querySelector('#password_length').value = profiles[index].password_length;
    document.querySelector('#password_type').value = profiles[index].password_type;
    document.querySelector('#color').value = profiles[index].color;
});

/**
 * Listen for update and broadcast it
 */
document.querySelector('#name').addEventListener('change', function(event) {
    var index = document.querySelector('#profile').value;
    profiles[index].name = event.target.value;
    document.querySelector('#profile').options[index].text = event.target.value;
    updateProfile();
});
document.querySelector('#private_key').addEventListener('change', function(event) {
    profiles[document.querySelector('#profile').value].private_key = event.target.value;
    updateProfile();
});
document.querySelector('#password_length').addEventListener('change', function(event) {
    profiles[document.querySelector('#profile').value].password_length = event.target.value;
    updateProfile();
});
document.querySelector('#password_type').addEventListener('change', function(event) {
    profiles[document.querySelector('#profile').value].password_type = event.target.value;
    updateProfile();
});
document.querySelector('#color').addEventListener('change', function(event) {
    profiles[document.querySelector('#profile').value].color = event.target.value;
    updateProfile();
});

function updateProfile() {
    var index = document.querySelector('#profile').value;
    var data = {
        profile_index: index,
        profile: profiles[index],
    };
    self.port.emit("update_profile", data);
}

document.querySelector('#add_profile').addEventListener('click', function() {
    self.port.emit("add_profile");
});
document.querySelector('#remove_profile').addEventListener('click', function() {
    if (profiles.length > 1) {
        self.port.emit("remove_profile", document.querySelector('#profile').value);
    }
});

// Tabs handling
var tabs = document.querySelectorAll('ul.tabs li');
for (let i=0; i<tabs.length; i++) {
    tabs[i].addEventListener('click', function(event) {
        let el = event.target;
        let tab_id = el.getAttribute('data-tab');

        for (let j=0; j<tabs.length; j++) {
            tabs[j].classList.remove('active');
        }

        let tab_content = document.querySelectorAll('.tab-content');
        for (let j=0; j<tab_content.length; j++) {
            tab_content[j].classList.remove('active');
        }

        el.classList.add('active');
        document.querySelector('#'+tab_id).classList.add('active');
    });
}

// List available site settings
self.port.on("site_settings", function(settings) {
    var table = document.querySelector('#stored_sites tbody');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    for (let site in settings) {
        let row = document.createElement('tr');
        let td_site = document.createElement('td');
        td_site.appendChild(document.createTextNode(site));
        let td_action = document.createElement('td');
        let remove_btn = document.createElement('button');
        remove_btn.setAttribute('data-site', site);
        remove_btn.onclick = function() {
            self.port.emit("remove_site", this.getAttribute('data-site'));
        };
        let img = document.createElement('img');
        img.src = 'img/remove.png';
        remove_btn.appendChild(img);
        td_action.appendChild(remove_btn);
        row.appendChild(td_site);
        row.appendChild(td_action);
        table.appendChild(row);
    }
});

self.port.on("quota", function(quota) {
    document.querySelector('#quota').value = quota;
    document.querySelector('#quota-percent').innerHTML = null;
    document.querySelector('#quota-percent').appendChild(document.createTextNode((quota*100).toFixed(0) + '%'));
    if (quota > 0.9) {
        document.querySelector('#quota-warning').style.display = "inline";
    } else {
        document.querySelector('#quota-warning').style.display = "none";
    }
});

// Tell main that we are ready
self.port.emit("ready");
