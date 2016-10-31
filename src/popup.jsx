/* eslint-env browser */
/* global chrome */
import React from 'react';
import { render } from 'react-dom';
import Popup from './components/popup.jsx';
import { openSettings } from './actions';
import { toggleSite, setTag, setProfile, setLength, setType } from './actions/site';

function onClose() {
  window.close();
}

function onSettings() {
  chrome.runtime.sendMessage(openSettings());
}

function onReady() {
  chrome.runtime.sendMessage({ type: 'POPUP_READY' });
}

function onToggleState(siteId) {
  chrome.runtime.sendMessage(toggleSite(siteId));
}

function onTagChange(siteId, tag) {
  chrome.runtime.sendMessage(setTag(siteId, tag));
}

function onTypeChange(siteId, type) {
  chrome.runtime.sendMessage(setType(siteId, type));
}

function onLengthChange(siteId, length) {
  chrome.runtime.sendMessage(setLength(siteId, length));
}

function onProfileChange(siteId, profileId) {
  chrome.runtime.sendMessage(setProfile(siteId, profileId));
}

function onPassword(request, setPasswordCallback) {
  chrome.runtime.sendMessage({
    type: 'REQUEST_PASS',
    siteData: request,
  }, (response) => {
    setPasswordCallback(response.hash);
  });
}

const popup = render(
  <Popup
    onReady={onReady}
    onClose={onClose}
    onSettings={onSettings}
    onPassword={onPassword}
    onToggleState={onToggleState}
    onProfileChange={onProfileChange}
    onTagChange={onTagChange}
    onTypeChange={onTypeChange}
    onLengthChange={onLengthChange}
  />,
  document.getElementById('quick-settings')
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@POPUP_STATE') {
    popup.setState(message.state);
  }
});
