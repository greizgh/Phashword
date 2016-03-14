/*
 * Copyright 2014-2016 Greizgh
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
var ss = require("sdk/simple-storage");
var _ = require("sdk/l10n").get;
var utils = require("./utils");
var pwh = require("./PasswordHasher");
var backend = require("./backend");
var workers = require("./workers");
var popup = require("./popup").popup;
var prompt = require("./prompt").prompt;
var passwordHasher = new pwh.PasswordHasher();
var manager = new backend.ProfileManager();
var workersManager = workers.manager;
var settingsWorker;
var currentSite;
/** Keep track of worker requesting a password promt **/
var askingWorker;

/* Handle preferences */
function onSettingsChange(pref) {
    var workers = workersManager.getWorkers();
    function updatePrefererences(worker) {
        var data = {
            "key": sp.prefs.toggle_key,
            "external_prompt": sp.prefs.external_prompt
        };
        worker.port.emit("update_prefs", data);
    }
    for (let site in workers) {
        workers[site].forEach(updatePrefererences);
    }
}
sp.on("toggle_key", onSettingsChange);
sp.on("external_prompt", onSettingsChange);

/* Handle over quota events */
ss.on('OverQuota', function() {
    let notification = require("sdk/notifications");
    notification.notify({
        title: _('notify_quota_title'),
        text: _('notify_quota_text')
    });
    displaySettings();
});

prompt.port.on('set-master', function(data) {
    prompt.hide();
    var site_profile = manager.getSiteSettings(utils.grepUrl(askingWorker.url));
    var profile = manager.getProfile(site_profile.profile_index);
    var hash = passwordHasher.hashPassword(
        site_profile.tag,
        data,
        profile.private_key,
        site_profile.password_length,
        site_profile.password_type
    );
    askingWorker.port.emit("hash", hash);
});

/* Content script */
var selector = pageMod.PageMod({
    include: ['*'],
    contentScriptWhen: 'start',
    contentScriptOptions: {
        "key": sp.prefs.toggle_key,
        "status": sp.prefs.default_status,
        "external_prompt": sp.prefs.external_prompt
    },
    contentScriptFile: data.url('content.js'),
    onAttach: function(worker) {
        workersManager.addWorker(worker);
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
                site_profile.password_length,
                site_profile.password_type
            );
            worker.port.emit("hash", hash);
        });
        worker.port.on("ask_pass", function() {
            askingWorker = worker;
            prompt.show();
        });
        worker.on('detach', function() {
            workersManager.removeWorker(this);
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

/* Context menu */
var contextMenu = require("sdk/context-menu");
contextMenu.Item({
    label: _("context.page.toggle"),
    image: data.url('img/icon-16.png'),
    context: contextMenu.PageContext(),
    contentScript: 'self.on("click", function() {self.postMessage(document.URL);});',
    onMessage: function (url) {
        var site = utils.grepUrl(url);
        var settings = manager.getSiteSettings(site);
        settings.status = !settings.status;
        manager.setSiteSettings(site, settings);
        workersManager.updateWorkers(site);
        updatePopup();
    }
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
popup.port.on("select_profile", function(profile_index) {
    var site_settings = manager.getSiteSettings(currentSite);
    site_settings.profile_index = profile_index;
    manager.setSiteSettings(currentSite, site_settings);
    workersManager.updateWorkers(currentSite);
});
popup.port.on("update_settings", function(site_settings) {
    manager.setSiteSettings(currentSite, site_settings);
    workersManager.updateWorkers(currentSite);
});
popup.port.on("get_hash", function(key) {
    var site_profile = manager.getSiteSettings(currentSite);
    var profile = manager.getProfile(site_profile.profile_index);
    var hash = passwordHasher.hashPassword(
        site_profile.tag,
        key,
        profile.private_key,
        site_profile.password_length,
        site_profile.password_type
    );
    popup.port.emit("hash", hash);
    manager.setSiteSettings(currentSite, site_profile, true);
});
popup.port.on("copy", function(string) {
    var clipboard = require("sdk/clipboard");
    clipboard.set(string);
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
                    worker.port.emit("site_settings", manager.getAllSiteSettings());
                    worker.port.emit("quota", manager.getQuota());
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
                    workersManager.updateWorkers();
                });
                worker.port.on("remove_site", function(site) {
                    manager.removeSiteSettings(site);
                    worker.port.emit("site_settings", manager.getAllSiteSettings());
                    worker.port.emit("quota", manager.getQuota());
                });
                worker.on("detach", function() {
                    settingsWorker = undefined;
                });
            }
        });
    }
}
