/* eslint-env browser */
/* global chrome */
import React from 'react';
import { render } from 'react-dom';
import Popup from './components/popup.jsx';
import { openSettings } from './actions';

function onClose() {
  window.close();
}

function onSettings() {
  chrome.runtime.sendMessage(openSettings());
}

function onPassword(request, setPasswordCallback) {
  chrome.runtime.sendMessage({
    type: 'REQUEST_PASS',
    siteData: request,
  }, (response) => {
    setPasswordCallback(response.hash);
  });
}

function dispatch(action) {
  chrome.runtime.sendMessage(action);
}

const popup = render(
  <Popup
    dispatch={dispatch}
    onClose={onClose}
    onSettings={onSettings}
    onPassword={onPassword}
  />,
  document.getElementById('quick-settings')
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@POPUP_STATE') {
    popup.setState(message.state);
  }
});
