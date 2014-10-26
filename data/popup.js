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

var profiles;
var site_settings;

function updateFields() {
  if (site_settings && profiles) {
    $('#tag').val(site_settings.tag);
    $('#profile').val(site_settings.profile_index);
    $('#profile').trigger('change');
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
  $('#profile').find('option').remove();
  var index = 0;
  profiles.forEach(function(profile){
    $('#profile').append(new Option(profile.name, index++));
  });
  updateFields();
});

$('#profile').change(function() {
  $('#password_length').val(profiles[$(this).val()].password_length);
  $('#password_type').val(profiles[$(this).val()].password_type);
  $('#color').css('background-color', profiles[$(this).val()].color);
  site_settings.profile_index = $(this).val();
  self.port.emit("select_profile", $(this).val());
});

$('#tag').change(function() {
  self.port.emit("update_tag", $(this).val());
});
$('#password_length').change(function() {
  profiles[$('#profile').val()].password_length = $(this).val();
  updateProfile();
});
$('#password_type').change(function() {
  profiles[$('#profile').val()].password_type = $(this).val();
  updateProfile();
});
$('#settings').click(function() {
  self.port.emit("display_settings");
});

function updateProfile() {
  var data = {
    profile_index: $('#profile').val(),
    profile: profiles[$('#profile').val()],
  };
  self.port.emit("update_profile", data);
}

self.port.emit("ready");
