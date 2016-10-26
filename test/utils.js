import { Map } from 'immutable';
import { assert } from 'chai';
import { url2tag, getSiteSettings, getPopupState, getSettingsState } from '../src/utils.js';
import { PASSWORD_TYPES } from '../src/constants.js';

const state = {
  settings: {
    defaultState: false,
  },
  currentSite: 'localhost',
  profiles: new Map({
    uuid: {
      type: PASSWORD_TYPES.NUMERIC,
      length: 8,
      default: true,
    },
    uuid2: {
      type: PASSWORD_TYPES.SPECIAL,
      length: 12,
      default: false,
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
});

describe('getPopupState', () => {
  it('should return profiles as an array', () => {
    const popupState = getPopupState(state);
    assert.equal(popupState.profiles.length, 2);
  });
});

describe('getSettingsState', () => {
  it('should return profiles as array', () => {
    const settingsState = getSettingsState(state);
    assert.equal(settingsState.profiles.length, 2);
  });
  it('should return sites as array', () => {
    const settingsState = getSettingsState(state);
    assert.equal(settingsState.sites.length, 1);
  });
});
