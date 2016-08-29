import siteReducer from '../src/reducers/site';
import { PASSWORD_TYPES } from '../src/constants';
import { assert } from 'chai';
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
    let sites = siteReducer([], addSite('www.mozilla.org'));
    assert.equal(sites.length, 1);
  });
  it('should allow to toggle site state', () => {
    let sites = siteReducer(
      [{hostname: 'www.mozilla.org', enabled: true}, {hostname: 'localhost', enabled: false}],
      toggleSite('localhost')
    );
    assert.isTrue(sites[0].enabled);
    assert.isTrue(sites[1].enabled);
  });
  it('should remove site', () => {
    let sites = siteReducer([{hostname: 'localhost'}], deleteSite('localhost'));
    assert.equal(sites.length, 0);
  });
  it('should update site tag', () => {
    let sites = siteReducer(
      [{hostname: 'localhost', tag: 'test'}, {hostname: 'www.mozilla.org', tag: 'mozilla'}],
      setTag('localhost', 'local')
    );
    assert.equal(sites[0].tag, 'local');
  });
  it('should update site profile', () => {
    let sites = siteReducer(
      [{hostname: 'localhost', profileId: 1}, {hostname: 'www.mozilla.org', profileId: 1}],
      setProfile('localhost', 2)
    );
    assert.equal(sites[0].profileId, 2);
  });
  it('should update site length', () => {
    let sites = siteReducer(
      [{hostname: 'localhost', length: 10}, {hostname: 'www.mozilla.org', length: 12}],
      setLength('localhost', 8)
    );
    assert.equal(sites[0].length, 8);
  });
  it('should update site type', () => {
    let sites = siteReducer(
      [{hostname: 'localhost', type: PASSWORD_TYPES.NUMERIC}, {hostname: 'www.mozilla.org'}],
      setType('localhost', PASSWORD_TYPES.SPECIAL)
    );
    assert.equal(sites[0].type, PASSWORD_TYPES.SPECIAL);
  });
});
