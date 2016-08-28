import { store, dispatcher } from './store';
import { hashPassword } from './hasher.js';

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.type) {
    case 'OPEN_SETTINGS':
      console.log('open settings');
      break;
    case 'REQUEST_PASS':
      const hash = hashPassword(
        request.tag,
        request.masterKey,
        request.privateKey,
        request.passwordLength,
        request.passwordType
      );
      break;
    default:
      dispatcher.onNext(request);
      break;
    }
  }
);

dispatcher.subscribe((message) => {
  console.log('dispatcher got ' + message.type);
});

// Update popup with new state
store.subscribe((state) => {
  console.log('publishing new state');
  const popup_state = {
    selectedProfile: state.currentProfile,
    profiles: state.profiles,
    siteId: state.currentSite,
    enabled: state.siteSettings[state.currentSite].enabled | state.settings.defaultState,
    tag: state.siteSettings[state.currentSite].tag | '',
    length: state.siteSettings[state.currentSite].length | state.profiles[state.currentProfile].length,
    type: state.siteSettings[state.currentSite].type | state.profiles[state.currentProfile].type,
  };
  chrome.runtime.sendMessage({
    type: '@POPUP_STATE',
    state: popup_state,
  });
});

dispatcher.onNext({type: 'test'});
