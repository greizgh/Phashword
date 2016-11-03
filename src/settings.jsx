/* eslint-env browser */
/* global chrome */
import React from 'react';
import { render } from 'react-dom';
import Settings from './components/admin/settings.jsx';
import { deleteSite } from './actions/site.js';
import { deleteProfile } from './actions/profile.js';

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
  />,
  document.getElementById('settings')
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@SETTINGS_STATE') {
    settings.setState(message.state);
  }
});
