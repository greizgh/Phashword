/* global browser, chrome */
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import hashPassword from './hasher';
import { setCurrentSite } from './actions';
import { url2tag, getPopupState, getSettingsState, getWorkerState } from './utils';
import { saveOnHash } from './middlewares/site';
import { ICONS_ON, ICONS_OFF } from './constants';

const main = (backend) => (savedData) => {
  const store = createStore(appReducer, savedData.state, applyMiddleware(saveOnHash));

  // Save state in given backend
  store.subscribe(() => {
    backend.set({ state: store.getState() });
  });

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      let hash;
      let privKey;
      switch (request.type) {
        case 'OPEN_SETTINGS':
          chrome.runtime.openOptionsPage();
          break;
        case 'REQUEST_PASS':
          privKey = store.getState().profiles.get(request.siteData.profile).key;
          hash = hashPassword(
            request.siteData.tag,
            request.siteData.masterKey,
            privKey,
            request.siteData.passwordLength,
            request.siteData.passwordType,
          );
          sendResponse({ hash });
          if (request.siteData.masterKey) {
            // Allow profile save if a password is generated
            store.dispatch(request);
          }
          break;
        default:
          if (!request.type.startsWith('@')) {
            store.dispatch(request);
          }
          break;
      }
    }
  );

  // Update popup with new state
  store.subscribe(() => {
    const state = getPopupState(store.getState());
    chrome.runtime.sendMessage({
      type: '@POPUP_STATE',
      state,
    });
    let icon = ICONS_OFF;
    if (state.enabled) {
      icon = ICONS_ON;
    }
    browser.browserAction.setIcon({ path: icon });
  });

  // Update settings with new state
  store.subscribe(() => {
    chrome.runtime.sendMessage({
      type: '@SETTINGS_STATE',
      state: getSettingsState(store.getState()),
    });
  });

  function updateWorkerState() {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            type: '@WORKER_STATE',
            state: getWorkerState(store.getState(), tabs[0].url),
          }
        );
      }
    });
  }

  // Update worker with new state
  store.subscribe(updateWorkerState);

  function handleTabChange() {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      if (tabs[0]) {
        const currentHostname = url2tag(tabs[0].url);
        store.dispatch(setCurrentSite(currentHostname));
        updateWorkerState();
      }
    });
  }

  chrome.tabs.onUpdated.addListener(handleTabChange);
  chrome.tabs.onActivated.addListener(handleTabChange);
}

browser.storage.local.get((data) => {
  if (data.synced) {
    // State has been migrated to sync backend
    browser.storage.sync.get(main(browser.storage.sync));
  } else {
    // Migrate data to sync backend
    browser.storage.sync.set(data)
    .catch((error) => {
      console.error(`Could not migrate data, fallback to local storage: ${error}`);
      main(browser.storage.local)(data);
    });
    browser.storage.local.set({ synced: true });
    browser.runtime.reload();
  }
});
