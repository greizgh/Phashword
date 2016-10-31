/* global chrome */
import { createStore } from 'redux';
import appReducer from './reducers';
import { hashPassword } from './hasher';
import { setCurrentSite } from './actions.js';
import { url2tag, getPopupState, getSettingsState } from './utils.js';

const store = createStore(appReducer);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    let hash;
    console.log(request);
    switch (request.type) {
      case 'OPEN_SETTINGS':
        chrome.runtime.openOptionsPage();
        break;
      case 'REQUEST_PASS':
        hash = hashPassword(
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
          store.dispatch(request);
        }
        break;
    }
  }
);

store.subscribe(() =>
  console.log(store.getState())
);

// Update popup with new state
store.subscribe(() => {
  const state = store.getState();
  chrome.runtime.sendMessage({
    type: '@POPUP_STATE',
    state: getPopupState(state),
  });
});

// Update settings with new state
store.subscribe(() => {
  const state = store.getState();
  chrome.runtime.sendMessage({
    type: '@SETTINGS_STATE',
    state: getSettingsState(state),
  });
});

function handleTabChange() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    if (tabs[0]) {
      const currentHostname = url2tag(tabs[0].url);
      store.dispatch(setCurrentSite(currentHostname));
    }
  });
}

chrome.tabs.onUpdated.addListener(handleTabChange);
chrome.tabs.onActivated.addListener(handleTabChange);
