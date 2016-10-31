import { assert } from 'chai';
import { Map } from 'immutable';
import profilesReducer from '../src/reducers/profile';
import { PASSWORD_TYPES } from '../src/constants';
import {
  createProfile,
  deleteProfile,
  setProfileName,
  setDefaultProfile,
  setProfileColor,
  setProfileKey,
  setProfileLength,
  setProfileType,
} from '../src/actions/profile';

describe('profilesReducer', () => {
  it('should provide a default profile', () => {
    const profiles = profilesReducer(undefined, {type: 'UNHANDLED'});
    assert.equal(profiles.size, 1);
    assert.isTrue(profiles.first().default)
  });
  it('should handle profile creation', () => {
    const profiles = profilesReducer(Map(), createProfile());
    assert.equal(profiles.size, 1);
  });
  it('should update profile name', () => {
    const profiles = profilesReducer(
      Map({uuid1: {name: 'test'}, uuid2: {name: 'original'}}),
      setProfileName('uuid1', 'update')
    );
    assert.equal(profiles.get('uuid1').name, 'update');
    assert.equal(profiles.get('uuid2').name, 'original');
  });
  it('should allow to change default profile', () => {
    const profiles = Map({
      uuid1: {default: true},
      uuid2: {default: false}, 
    });
    const state = profilesReducer(profiles, setDefaultProfile('uuid2'));
    assert.isFalse(state.get('uuid1').default);
    assert.isTrue(state.get('uuid2').default);
  });
  it('should update profile color', () => {
    const profiles = profilesReducer(
      Map({uuid1: {color: '#000000'}, uuid2: {color: 'blue'}}),
      setProfileColor('uuid1', '#ffffff')
    );
    assert.equal(profiles.get('uuid1').color, '#ffffff');
    assert.equal(profiles.get('uuid2').color, 'blue');
  });
  it('should update profile key', () => {
    const profiles = profilesReducer(
      Map({uuid1: {key: 'dumb'}, uuid2: {key: '1234'}}),
      setProfileKey('uuid1', 'test')
    );
    assert.equal(profiles.get('uuid1').key, 'test');
    assert.equal(profiles.get('uuid2').key, '1234');
  });
  it('should update profile length', () => {
    const profiles = profilesReducer(
      Map({uuid1: {length: 8}, uuid2: {length: 22}}),
      setProfileLength('uuid1', 12)
    );
    assert.equal(profiles.get('uuid1').length, 12);
    assert.equal(profiles.get('uuid2').length, 22);
  });
  it('should update profile type', () => {
    const profiles = profilesReducer(
      Map({uuid1: {type: PASSWORD_TYPES.SPECIAL}, uuid2: {type: PASSWORD_TYPES.ALPHANUMERIC}}),
      setProfileType('uuid1', PASSWORD_TYPES.NUMERIC)
    );
    assert.equal(profiles.get('uuid1').type, PASSWORD_TYPES.NUMERIC);
    assert.equal(profiles.get('uuid2').type, PASSWORD_TYPES.ALPHANUMERIC);
  });
  it('should support profile deletion', () => {
    const initialState = Map({
      uuid1: {},
      uuid2: {},
      uuid3: {},
    });
    const profiles = profilesReducer(initialState, deleteProfile('uuid2'));
    assert.equal(profiles.size, 2);
  });
});
