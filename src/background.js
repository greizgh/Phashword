import { store, dispatcher } from './store';
import { defaultProfileGenerator, defaultProfileSelector, siteSettingsSaver } from './observers';
import { hashPassword } from './hasher';
import { setCurrentSite } from './actions.js';
import { url2tag, getSiteSettings } from './utils.js';

store.subscribe(defaultProfileGenerator);
store.subscribe(defaultProfileSelector);
dispatcher.subscribe(siteSettingsSaver);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
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
  const currentSiteSettings = getSiteSettings(state);
  const popupState = {
    selectedProfile: state.currentProfile,
    profiles: state.profiles,
    siteId: state.currentSite,
    enabled: currentSiteSettings.enabled,
    tag: currentSiteSettings.tag,
    length: currentSiteSettings.length,
    type: currentSiteSettings.type,
  };
  chrome.runtime.sendMessage({
    type: '@POPUP_STATE',
    state: popupState,
  });
});

function handleTabChange() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs[0]) {
      const currentHostname = url2tag(tabs[0].url);
      dispatcher.onNext(setCurrentSite(currentHostname));
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.tabs.onActivated.addListener(handleTabChange);
