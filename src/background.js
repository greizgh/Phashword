import { store, dispatcher } from './store';
import { defaultProfileGenerator, defaultProfileSelector, siteSettingsSaver } from './observers';
import { hashPassword } from './hasher';
import { setCurrentSite } from './actions.js';
import { url2tag } from './utils.js';

store.subscribe(defaultProfileGenerator);
store.subscribe(defaultProfileSelector);
dispatcher.subscribe(siteSettingsSaver);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
    case 'OPEN_SETTINGS':
      chrome.runtime.openOptionsPage();
      break;
    case 'REQUEST_PASS':
      const hash = hashPassword(
        request.tag,
        request.masterKey,
        request.privateKey,
        request.passwordLength,
        request.passwordType
      );
      sendResponse({ hash });
      break;
    default:
      if (!request.type.startsWith('@')) {
        dispatcher.onNext(request);
      }
      break;
    }
  }
);

// Update popup with new state
store.subscribe((state) => {
  const currentSiteSettings = state.siteSettings[state.currentSite] || {};
  const popup_state = {
    selectedProfile: state.currentProfile,
    profiles: state.profiles,
    siteId: state.currentSite,
    enabled: currentSiteSettings.enabled || state.settings.defaultState,
    tag: currentSiteSettings.tag || state.currentSite,
    length: currentSiteSettings.length || state.profiles[state.currentProfile].length,
    type: currentSiteSettings.type || state.profiles[state.currentProfile].type,
  };
  chrome.runtime.sendMessage({
    type: '@POPUP_STATE',
    state: popup_state,
  });
});

function handleTabChange() {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs) {
    if (tabs[0]) {
      const currentHostname = url2tag(tabs[0].url);
      dispatcher.onNext(setCurrentSite(currentHostname));
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.tabs.onActivated.addListener(handleTabChange);
