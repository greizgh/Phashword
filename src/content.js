/* eslint-env browser */
/* global chrome */

let state = { enabled: false };
// Keep track of covered input
let cover;
let enter = false;
const DISABLED_ATTR = 'nophash';

// Create password overlay
const overlay = document.createElement('input');
overlay.type = 'password';
overlay.style.zIndex = 2147483647;
overlay.style.border = '0';
overlay.style.borderRadius = '5px';
overlay.style.paddingLeft = '10px';
overlay.style.paddingRight = '10px';
overlay.style.margin = '0px';
overlay.style.boxSizing = 'border-box';
overlay.style.visibility = 'hidden';
overlay.style.position = 'absolute';
document.body.appendChild(overlay);

overlay.addEventListener('blur', function (event) {
  // On overlay blur, set password field with hash and hide overlay
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
    if (enter) {
      cover.form.submit();
      enter = false;
    }
  });
  event.target.value = '';
});

// show overlay and give it the same dimensions as target
function setOverlay(target) {
  cover = target;
  const targetRect = target.getBoundingClientRect();
  overlay.style.top = `${targetRect.top + window.scrollY}px`;
  overlay.style.left = `${targetRect.left + window.scrollX}px`;
  overlay.style.width = `${targetRect.width}px`;
  overlay.style.height = `${targetRect.height}px`;
  overlay.style.visibility = 'visible';
  overlay.focus();
}

// Handle toggle key press to reenable overlay for field
function handleToggleKey(event) {
  if (event.target.type === 'password' && event.target.hasAttribute(DISABLED_ATTR)) {
    if (event.key === state.toggleKey) {
      event.target.removeAttribute(DISABLED_ATTR);
      event.target.removeEventListener('keydown', handleToggleKey);
      setOverlay(event.target);
    }
  }
}

overlay.addEventListener('keydown', function (event) {
  // On enter 'forward' submit to covered field
  if (event.key === 'Enter') {
    enter = true;
    overlay.blur();
  }
  // On toggle key press, disable overlay for covered field
  if (event.key === state.toggleKey) {
    cover.setAttribute(DISABLED_ATTR, true);
    overlay.value = '';
    overlay.blur();
    cover.focus();
    cover.addEventListener('keydown', handleToggleKey);
  }
});

// On focus, show overlay
function handleFocus(event) {
  if (event.target.type === 'password' && event.target != overlay && !event.target.hasAttribute(DISABLED_ATTR)) {
    setOverlay(event.target);
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
