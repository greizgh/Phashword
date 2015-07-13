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

var backend = require("../lib/backend");
var constants = require("../lib/constants");
var manager = new backend.ProfileManager();

exports['test default profile creation'] = function(assert) {
  var profile = manager.getProfile(0);
  assert.ok(profile !== null, "Default profile exists");
  assert.ok(profile.name === "Default", "Default profile is named Default");
  assert.ok(profile.password_length === 12, "A length of 12 is a sound default");
  assert.ok(profile.password_type === constants.PASSWORD_TYPES.SPECIAL, "Default password type is alphanumeric and special chars");
};

exports['test profile save/load operations'] = function(assert) {
  var profile = manager.getProfile(0);
  manager.addProfile(profile);
  assert.ok(manager.getProfile(1) === profile, "Profile is correctly saved");
};

exports['test site profile save/load'] = function(assert) {
  var site_profile = manager.getSiteSettings('test');
  assert.ok(site_profile.profile_index === 0, "Site profile should default to default profile");
  assert.ok(site_profile.tag === 'test', "Tag should default to site");
  assert.ok(site_profile.status === require("sdk/simple-prefs").prefs.default_status, "Site profile should follow default status setting");
  site_profile.tag = "42";
  site_profile.profile_index = 3;
  manager.setSiteSettings('test', site_profile);
  assert.ok(manager.getSiteSettings('test').tag === "42", "Tag should be saved");
  assert.ok(manager.getSiteSettings('test').profile_index === 3, "Profile index should be saved");
};

exports['test not saving default site profile'] = function(assert) {
  var nb_sites = Object.keys(manager.getAllSiteSettings()).length;
  var site_profile = manager.getSiteSettings('somesite');
  manager.setSiteSettings('somesite', site_profile);
  assert.ok(Object.keys(manager.getAllSiteSettings()).length === nb_sites, "Default site profile should not be saved");
};

exports['test force saving'] = function(assert) {
  var nb_sites = Object.keys(manager.getAllSiteSettings()).length;
  var site_profile = manager.getSiteSettings('somesite');
  manager.setSiteSettings('somesite', site_profile, true);
  assert.ok(Object.keys(manager.getAllSiteSettings()).length === nb_sites + 1, "Profile saving should be forced");
};

exports['test site settings removal'] = function(assert) {
  var site_settings = manager.getSiteSettings('test');
  manager.setSiteSettings('test', site_settings);
  var nb_sites = Object.keys(manager.getAllSiteSettings()).length;
  manager.removeSiteSettings('test');
  assert.ok(Object.keys(manager.getAllSiteSettings()).length === (nb_sites - 1), "Site should be removed");
};

exports['test profile creation / deletetion'] = function(assert) {
  var num = manager.getProfiles().length;
  manager.addProfile(manager.getNewProfile());
  assert.ok(manager.getProfiles().length === num + 1, "New profile should be saved");
  manager.removeProfile(num);
  assert.ok(manager.getProfiles().length === num, "Profile should be removed");
};

exports['test error'] = function(assert) {
  assert.ok(manager.getProfile(99) === undefined, "Non existent profile should not exists");
};

require("sdk/test").run(exports);
