/* eslint-env browser */
/* global chrome */

let state = { enabled: false };
// Keep track of covered input
let cover;

// Create password overlay
const overlay = document.createElement('input');
overlay.type = 'password';
overlay.style.border = '0';
overlay.style.borderRadius = '5px';
overlay.style.padding = '10px';
overlay.style.visibility = 'hidden';
overlay.style.position = 'absolute';
document.body.appendChild(overlay);

overlay.addEventListener('blur', function(event) {
  event.target.style.visibility = 'hidden';
  const request = {
    passwordType: state.type,
    passwordLength: state.length,
    tag: state.tag,
    masterKey: event.target.value,
    profile: state.profile,
  };
  chrome.runtime.sendMessage({
    type: 'REQUEST_PASS',
    siteData: request,
  }, (response) => {
    cover.value = response.hash;
  });
  event.target.value = '';
});

function handleFocus(event) {
  if (event.target.type === 'password' && event.target != overlay) {
    cover = event.target;
    const targetRect = event.target.getBoundingClientRect();
    overlay.style.top = `${targetRect.top}px`;
    overlay.style.left = `${targetRect.left}px`;
    overlay.style.width = `${targetRect.right - targetRect.left}px`;
    overlay.style.height = `${targetRect.bottom - targetRect.top}px`;
    overlay.style.visibility = 'visible';
    overlay.focus();
  }
}

function enable() {
  document.addEventListener('focus', handleFocus, true);
}

function disable() {
  document.removeEventListener('focus', handleFocus, true);
  overlay.style.visibility = 'hidden';
  cover.focus();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === '@WORKER_STATE') {
    if (state.enabled && !message.state.enabled) {
      disable();
    }
    if (!state.enabled && message.state.enabled) {
      enable();
    }
    state = message.state;
    overlay.style.backgroundColor = state.color;
    overlay.placeholder = `${state.name} - ${state.tag}`;
  }
});

// Advertise background that worker is ready
chrome.runtime.sendMessage({ type: 'WORKER_READY' });
