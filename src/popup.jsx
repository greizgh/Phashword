import React from 'react';
import { render } from 'react-dom';
import Popup from './components/popup.jsx';
import { openSettings } from './actions';

function dispatch(action) {
  chrome.runtime.sendMessage(action);
}

function onClose() {
  window.close();
}

function onSettings() {
  chrome.runtime.sendMessage(openSettings());
}

const popup = render(
  <Popup dispatch={dispatch} onClose={onClose} onSettings={onSettings}/>,
  document.getElementById('quick-settings')
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@POPUP_STATE') {
    popup.setState(message.state);
  }
});
