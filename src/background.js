/* global chrome */
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import hashPassword from './hasher';
import { setCurrentSite } from './actions.js';
import { url2tag, getPopupState, getSettingsState, getWorkerState } from './utils.js';
import { saveOnHash } from './middlewares/site.js';
import migrateData from './migration.js';

chrome.storage.local.get((savedData) => {
  if (!savedData.state) {
    // Try to migrate from v1
    const port = browser.runtime.connect({name: "sync-v1-data"});
    port.onMessage.addListener((data) => {
      if (data) {
        const migratedState = migrateData(data);
        chrome.storage.local.set({ migrated: true });
        chrome.storage.local.set({ state: migratedState });
        browser.runtime.reload();
      }
    });
  }

  const store = createStore(appReducer, savedData.state, applyMiddleware(saveOnHash));

  // Save state in local storage
  store.subscribe(() => {
    chrome.storage.local.set({ state: store.getState() });
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
            request.siteData.passwordType
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
    chrome.runtime.sendMessage({
      type: '@POPUP_STATE',
      state: getPopupState(store.getState()),
    });
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
});
