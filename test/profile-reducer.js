import profilesReducer from '../src/reducers/profile';
import { PASSWORD_TYPES } from '../src/constants';
import { assert } from 'chai';
import {
  createProfile,
  setProfileName,
  setDefaultProfile,
  setProfileColor,
  setProfileKey,
  setProfileLength,
  setProfileType,
} from '../src/actions/profile';

describe('profilesReducer', () => {
  it('should handle profile creation', () => {
    let profiles = profilesReducer([], createProfile());
    assert.equal(profiles.length, 1);
  });
  it('should update profile name', () => {
    let profiles = profilesReducer([{id: 1, name: 'test'}], setProfileName(1, 'update'));
    assert.equal(profiles[0].name, 'update');
  });
  it('should allow to change default profile', () => {
    let profiles = [
      {id: 1, default: true},
      {id: 2, default: false},
    ];
    let state = profilesReducer(profiles, setDefaultProfile(2));
    state.map((profile) => {
      if (profile.id === 1) {
        assert.isFalse(profile.default);
      } else {
        assert.isTrue(profile.default);
      }
    });
  });
  it('should update profile color', () => {
    let profiles = profilesReducer([{id: 2, color: '#000000'}], setProfileColor(2, '#ffffff'));
    assert.equal(profiles[0].color, '#ffffff');
  });
  it('should update profile key', () => {
    let profiles = profilesReducer([{id: 1, key: 'dumb'}], setProfileKey(1, 'test'));
    assert.equal(profiles[0].key, 'test');
  });
  it('should update profile length', () => {
    let profiles = profilesReducer([{id: 1, length: 8}], setProfileLength(1, 12));
    assert.equal(profiles[0].length, 12);
  });
  if('should update profile type', () => {
    let profiles = profilesReducer(
      [{id: 1, type: PASSWORD_TYPES.SPECIAL}],
      setProfileType(1, PASSWORD_TYPES.NUMERIC)
    );
    assert.equal(profiles[0].type, PASSWORD_TYPES.NUMERIC);
  });
});
