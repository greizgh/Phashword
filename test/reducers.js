import { assert } from 'chai';
import { setCurrentProfile } from '../src/actions.js';
import appReducer from '../src/reducers.js';

describe('appReducer', () => {
  it('should handle profile change', () => {
    const state = appReducer({}, setCurrentProfile(2));
    assert.equal(state.currentProfile, 2);
  });
});
