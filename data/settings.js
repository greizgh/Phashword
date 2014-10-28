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

self.port.on("populate", function(data) {
  $('#profile').find('option').remove();
  profiles = data;
  var index = 0;
  profiles.forEach(function(profile){
    $('#profile').append(new Option(profile.name, index++));
  });
  $('#profile').val(0); // Default profile
  $('#name').val(profiles[0].name);
  $('#private_key').val(profiles[0].private_key);
  $('#password_length').val(profiles[0].password_length);
  $('#password_type').val(profiles[0].password_type);
  $('#color').val(profiles[0].color);
});

$('#profile').change(function() {
  $('#name').val(profiles[$(this).val()].name);
  $('#private_key').val(profiles[$(this).val()].private_key);
  $('#password_length').val(profiles[$(this).val()].password_length);
  $('#password_type').val(profiles[$(this).val()].password_type);
  $('#color').val(profiles[$(this).val()].color);
});

/**
 * Listen for update and broadcast it
 */
$('#name').change(function() {
  profiles[$('#profile').val()].name = $(this).val();
  $('#profile option:selected').text($(this).val());
  updateProfile();
});
$('#private_key').change(function() {
  profiles[$('#profile').val()].private_key = $(this).val();
  updateProfile();
});
$('#password_length').change(function() {
  profiles[$('#profile').val()].password_length = $(this).val();
  updateProfile();
});
$('#password_type').change(function() {
  profiles[$('#profile').val()].password_type = $(this).val();
  updateProfile();
});
$('#color').change(function() {
  profiles[$('#profile').val()].color = $(this).val();
  updateProfile();
});

function updateProfile() {
  var data = {
    profile_index: $('#profile').val(),
    profile: profiles[$('#profile').val()],
  };
  self.port.emit("update_profile", data);
}

$('#add_profile').on('click', function() {
  self.port.emit("add_profile");
});
$('#remove_profile').on('click', function() {
  if (profiles.length > 1) {
    self.port.emit("remove_profile", $('#profile').val());
  }
});
self.port.emit("ready");
