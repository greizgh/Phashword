/* eslint-env browser */
/* global browser, chrome */
import React from 'react';
import { render } from 'react-dom';
import Settings from './components/admin/settings.jsx';
import { deleteSite } from './actions/site.js';

function onSiteDelete(siteId) {
  chrome.runtime.sendMessage(deleteSite(siteId));
}

function dispatch(action) {
  chrome.runtime.sendMessage(action);
}

const settings = render(
  <Settings
    dispatch={dispatch}
    onSiteDelete={onSiteDelete}
    translate={browser.i18n.getMessage}
  />,
  document.getElementById('settings')
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@SETTINGS_STATE') {
    settings.setState(message.state);
  }
});
