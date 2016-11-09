const webext = require("sdk/webextension");
const sp = require("sdk/simple-prefs");
const ss = require("sdk/simple-storage");

function sendLegacyData(port) {
  // Send the initial data dump.
  port.postMessage({
    profiles: ss.storage.profiles,
    siteSettings: ss.storage.site_settings,
    preferences: {
      toggleKey: sp.prefs.toggle_key,
      defaultState: sp.prefs.default_status,
    },
  });
};

webext.startup().then(({browser}) => {
  browser.runtime.onConnect.addListener(port => {
    if (port.name === "sync-v1-data") {
      sendLegacyData(port);
    }
  });
});
