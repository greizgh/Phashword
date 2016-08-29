import profilesReducer from '../src/reducers/profile';
import { assert } from 'chai';
import { createProfile, setProfileName, setProfileDefault } from '../src/actions/profile';

describe('profilesReducer', () => {
  it('should handle profile creation', () => {
    let profiles = profilesReducer([], createProfile());
    assert.equal(profiles.length, 1);
  });
  it('should update profile name', () => {
    let profiles = profilesReducer([{id: 1, name: 'test'}], setProfileName(1, 'update'));
    assert.equal(profiles[0].name, 'update');
  });
});
