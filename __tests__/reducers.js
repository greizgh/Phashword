import { assert } from 'chai';
import { setCurrentProfile, setCurrentSite } from '../src/actions.js';
import appReducer from '../src/reducers.js';

describe('appReducer', () => {
  it('should handle profile change', () => {
    const state = appReducer({}, setCurrentProfile(2));
    assert.equal(state.currentProfile, 2);
  });
  it('should handle site change', () => {
    const state = appReducer({}, setCurrentSite('test'));
    assert.equal(state.currentSite, 'test');
  });
  it('should return default store on init', () => {
    const state = appReducer(undefined, { type: 'UNHANDLED' });
    assert.isDefined(state.profiles, 'state has profiles key');
    assert.isDefined(state.siteSettings, 'state has site settings key');
    assert.isDefined(state.currentSite, 'state has current site key');
  });
});
