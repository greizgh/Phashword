import { Map } from 'immutable';
import { assert } from 'chai';
import { url2tag, getSiteSettings } from '../src/utils.js';
import { PASSWORD_TYPES } from '../src/constants.js';

describe('url2tag', () => {
  it('should handle IPs', () => {
    let url = 'http://127.0.0.1';
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
  const state = {
    settings: {
      defaultState: false
    },
    currentSite: 'localhost',
    currentProfile: 'uuid',
    profiles: Map({ 'uuid': {
      type: PASSWORD_TYPES.NUMERIC,
      length: 8,
    }}),
    siteSettings: Map({
      mozilla: {
        enabled: true,
        type: PASSWORD_TYPES.SPECIAL,
        length: 12,
        tag: 'special',
        profile: 'uuid',
      }
    })
  };
  it('should return default data when there is no site settings', () => {
    assert.equal(getSiteSettings(state).tag, 'localhost');
    assert.equal(getSiteSettings(state).length, 8);
    assert.isFalse(getSiteSettings(state).enabled);
  });
  it('should return site settings where possible', () => {
    state.currentSite = 'mozilla';
    assert.equal(getSiteSettings(state).tag, 'special');
    assert.isTrue(getSiteSettings(state).enabled);
    assert.equal(getSiteSettings(state).length, 12);
  })
});
