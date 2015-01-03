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

var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var sp = require("sdk/simple-prefs");
var utils = require("utils");
var pwh = require("PasswordHasher");
var backend = require("backend");
var popup = require("popup").popup;
var passwordHasher = new pwh.PasswordHasher();
var manager = new backend.ProfileManager();
var settingsWorker;
var currentSite;

/* Handle preferences */
function onToggleKeyChange(pref) {
  workers.forEach(function(site){
    site.forEach(function(worker){
      worker.port.emit("update_prefs", {"key": sp.prefs.toggle_key});
    });
  });
}
sp.on("toggle_key", onToggleKeyChange);


/* Content script */
var workers = {};

function addWorker(worker, site) {
  if (workers[site]) {
    workers[site].push(worker);
  } else {
    workers[site] = [worker];
  }
}

function detachWorker(worker) {
  var site = utils.grepUrl(worker.url);
  if (workers[site]) {
    var index = workers[site].indexOf(worker);
    if (index != -1) {
      workers[site].splice(index, 1);
    }
  }
}

function updateWorker(worker) {
  var site_settings = manager.getSiteSettings(utils.grepUrl(worker.url));
  var data = {
    site_settings: site_settings,
    profile: manager.getProfile(site_settings.profile_index)
  };
  try {
    worker.port.emit("update_profile", data);
  } catch (e) {
    detachWorker(worker);
  }
}

function updateWorkers(site=false) {
  if (site) {
    if (workers[site]) {
      workers[site].forEach(updateWorker);
    }
  } else {
    for (let worker_site in workers) {
      workers[worker_site].forEach(updateWorker);
    }
  }
}

var selector = pageMod.PageMod({
  include: ['*'],
  contentScriptWhen: 'start',
  contentScriptOptions: {
    "key": sp.prefs.toggle_key,
    "status": sp.prefs.default_status
  },
  contentScriptFile: data.url('content.js'),
  onAttach: function(worker) {
    addWorker(worker, utils.grepUrl(worker.url));
    worker.port.on("ready", function() {
      var site_settings = manager.getSiteSettings(utils.grepUrl(worker.url));
      var data = {
        site_settings: site_settings,
        profile: manager.getProfile(site_settings.profile_index)
      };
      worker.port.emit("update_profile", data);
    });
    worker.port.on("get_hash", function(key) {
      var site_profile = manager.getSiteSettings(utils.grepUrl(worker.url));
      var profile = manager.getProfile(site_profile.profile_index);
      var hash = passwordHasher.hashPassword(
        site_profile.tag,
        key,
        profile.private_key,
        profile.password_length,
        profile.password_type
      );
      worker.port.emit("hash", hash);
    });
    worker.on('detach', function() {
      detachWorker(this);
    });
  }
});

/* Update current URL */
tabs.on('activate', function(tab) {
  currentSite = utils.grepUrl(tab.url);
  updatePopup();
});
tabs.on('ready', function(tab) {
  currentSite = utils.grepUrl(tabs.activeTab.url);
  updatePopup();
});

function updatePopup() {
  var site_settings = manager.getSiteSettings(currentSite);
  popup.port.emit("update_settings", site_settings);
}

/* Popup events */
popup.port.on("ready", function() {
  var profiles = manager.getProfiles();
  popup.port.emit("populate", profiles);
});
popup.port.on("update_profile", function(data) {
  manager.updateProfile(data.profile_index, data.profile);
  if (settingsWorker) {
    var profiles = manager.getProfiles();
    settingsWorker.port.emit("populate", profiles);
  }
  updateWorkers(currentSite);
});
popup.port.on("select_profile", function(profile_index) {
  var site_settings = manager.getSiteSettings(currentSite);
  site_settings.profile_index = profile_index;
  manager.setSiteSettings(currentSite, site_settings);
  updateWorkers(currentSite);
});
popup.port.on("update_settings", function(site_settings) {
  manager.setSiteSettings(currentSite, site_settings);
  updateWorkers(currentSite);
});
popup.port.on("get_hash", function(key) {
  var site_profile = manager.getSiteSettings(currentSite);
  var profile = manager.getProfile(site_profile.profile_index);
  var hash = passwordHasher.hashPassword(
    site_profile.tag,
    key,
    profile.private_key,
    profile.password_length,
    profile.password_type
  );
  popup.port.emit("hash", hash);
});


popup.port.on("display_settings", displaySettings);
sp.on('open_settings', displaySettings);

function displaySettings() {
  if (settingsWorker) {
    settingsWorker.tab.activate();
  } else {
    tabs.open({
      url: data.url("settings.html"),
      inBackground: false,
      onReady: function(tab)
      {
        worker = tab.attach({
          contentScriptFile: data.url("settings.js")
        });
        settingsWorker = worker;
        // Settings panel events
        worker.port.on("ready", function() {
          var profiles = manager.getProfiles();
          worker.port.emit("populate", profiles);
        });
        worker.port.on("add_profile", function() {
          manager.addProfile(manager.getNewProfile());
          worker.port.emit("populate", manager.getProfiles());
          popup.port.emit("populate", manager.getProfiles());
        });
        worker.port.on("remove_profile", function(index) {
          manager.removeProfile(index);
          worker.port.emit("populate", manager.getProfiles());
          popup.port.emit("populate", manager.getProfiles());
        });
        worker.port.on("update_profile", function(data) {
          manager.updateProfile(data.profile_index, data.profile);
          popup.port.emit("populate", manager.getProfiles());
          updateWorkers();
        });
        worker.on("detach", function() {
          settingsWorker = undefined;
        });
      }
    });
  }
}
