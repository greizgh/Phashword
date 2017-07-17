import { Map } from 'immutable';
import { assert } from 'chai';
import {
  url2tag,
  getSiteSettings,
  getPopupState,
  getSettingsState,
  getWorkerState,
} from '../src/utils.js';
import { PASSWORD_TYPES } from '../src/constants.js';

const state = {
  settings: {
    defaultState: false,
    toggleKey: 'Esc',
  },
  currentSite: 'localhost',
  profiles: new Map({
    uuid: {
      type: PASSWORD_TYPES.NUMERIC,
      length: 8,
      default: true,
      color: '#f0f0f0',
      name: 'Default',
    },
    uuid2: {
      type: PASSWORD_TYPES.SPECIAL,
      length: 12,
      default: false,
      color: '#abcdef',
      name: 'FOSS',
    },
  }),
  siteSettings: new Map({
    mozilla: {
      enabled: true,
      type: PASSWORD_TYPES.SPECIAL,
      length: 12,
      tag: 'special',
      profile: 'uuid2',
    },
  }),
};

describe('url2tag', () => {
  it('should handle IPs', () => {
    const url = 'http://127.0.0.1';
    assert.equal('127.0.0.1', url2tag(url));
  });
  it('should return the same tag from different domains', () => {
    assert.equal('google', url2tag('http://google.fr'));
    assert.equal('google', url2tag('http://mail.google.com'));
  });
  it('should return hostname', () => {
    assert.equal('localhost', url2tag('http://localhost'));
  });
  it('should handle firefox internal urls', () => {
    assert.equal('', url2tag('about:config'));
  });
});

describe('getSiteSettings', () => {
  it('should return default data when there is no site settings', () => {
    const settings = getSiteSettings(state);
    assert.equal(settings.tag, 'localhost');
    assert.equal(settings.length, 8);
    assert.isFalse(settings.enabled);
    assert.equal(settings.profile, 'uuid');
  });
  it('should return site settings where possible', () => {
    state.currentSite = 'mozilla';
    const settings = getSiteSettings(state);
    assert.equal(settings.tag, 'special');
    assert.isTrue(settings.enabled);
    assert.equal(settings.length, 12);
    assert.equal(settings.profile, 'uuid2');
  });
  it('should accept site as optional argument', () => {
    const settings = getSiteSettings(state, 'test');
    assert.equal(settings.tag, 'test');
    assert.isFalse(settings.enabled);
    assert.equal(settings.length, 8);
    assert.equal(settings.profile, 'uuid');
  });
});

describe('getPopupState', () => {
  it('should return profiles as an array', () => {
    const popupState = getPopupState(state);
    assert.equal(popupState.profiles.length, 2);
  });
});

describe('getSettingsState', () => {
  const settingsState = getSettingsState(state);
  it('should return profiles as array', () => {
    assert.equal(settingsState.profiles.length, 2);
  });
  it('should return sites as array', () => {
    assert.equal(settingsState.sites.length, 1);
  });
  it('should return default state', () => {
    assert.isDefined(settingsState.defaultState);
  });
  it('should return toggle key', () => {
    assert.isDefined(settingsState.toggleKey);
  });
});

describe('getWorkerState', () => {
  it('should expose site data', () => {
    const workerState = getWorkerState(state, 'http://www.mozilla.org');
    assert.equal(workerState.length, 12);
    assert.isTrue(workerState.enabled);
    assert.equal(workerState.type, PASSWORD_TYPES.SPECIAL);
    assert.equal(workerState.tag, 'special');
    assert.equal(workerState.profile, 'uuid2');
  });
  it('should expose profile color', () => {
    const workerState = getWorkerState(state, 'http://www.mozilla.org');
    assert.equal(workerState.color, '#abcdef');
  });
  it('should expose profile name', () => {
    const workerState = getWorkerState(state, 'http://www.mozilla.org');
    assert.equal(workerState.name, 'FOSS');
  });
  it('should expose toggle key', () => {
    const workerState = getWorkerState(state, 'http://www.mozilla.org');
    assert.equal(workerState.toggleKey, 'Esc');
  });
});
