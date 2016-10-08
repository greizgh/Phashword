import { assert } from 'chai';
import { Map } from 'immutable';
import siteReducer from '../src/reducers/site';
import { PASSWORD_TYPES } from '../src/constants';
import {
  addSite,
  deleteSite,
  toggleSite,
  setProfile,
  setLength,
  setTag,
  setType,
} from '../src/actions/site';

describe('siteReducer', () => {
  it('should handle site creation', () => {
    const sites = siteReducer(Map(), addSite('www.mozilla.org'));
    assert.equal(sites.size, 1);
  });
  it('should allow to toggle site state', () => {
    const sites = siteReducer(
      Map({'www.mozilla.org': { enabled: true}, 'localhost': {enabled: false}}),
      toggleSite('localhost')
    );
    assert.isTrue(sites.get('www.mozilla.org').enabled);
    assert.isTrue(sites.get('localhost').enabled);
  });
  it('should remove site', () => {
    const sites = siteReducer(Map({localhost: {}}), deleteSite('localhost'));
    assert.equal(sites.size, 0);
  });
  it('should update site tag', () => {
    const sites = siteReducer(
      Map({'localhost': {tag: 'test'}, 'www.mozilla.org': {tag: 'mozilla'}}),
      setTag('localhost', 'local')
    );
    assert.equal(sites.get('localhost').tag, 'local');
  });
  it('should update site profile', () => {
    const sites = siteReducer(
      Map({'localhost': {profileId: 1}, 'www.mozilla.org': {profileId: 1}}),
      setProfile('localhost', 2)
    );
    assert.equal(sites.get('localhost').profileId, 2);
  });
  it('should update site length', () => {
    const sites = siteReducer(
      Map({'localhost': {length: 10}, 'www.mozilla.org': {length: 12}}),
      setLength('localhost', 8)
    );
    assert.equal(sites.get('localhost').length, 8);
  });
  it('should update site type', () => {
    const sites = siteReducer(
      Map({'localhost': {type: PASSWORD_TYPES.NUMERIC}}),
      setType('localhost', PASSWORD_TYPES.SPECIAL)
    );
    assert.equal(sites.get('localhost').type, PASSWORD_TYPES.SPECIAL);
  });
});
