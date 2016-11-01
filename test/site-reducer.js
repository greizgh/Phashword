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

const fakeState = {
  currentSite: 'testsite',
  settings: {
    defaultState: true,
  },
  profiles: new Map({
    uuid: {
      default: true,
      length: 12,
      type: PASSWORD_TYPES.SPECIAL,
    },
  }),
  siteSettings: new Map({
    mozilla: {
      enabled: true,
      tag: 'mozilla',
      length: 12,
      type: PASSWORD_TYPES.SPECIAL,
      profile: 'uuid',
    },
    test: {
      enabled: false,
      tag: 'test',
      length: 8,
      type: PASSWORD_TYPES.NUMERIC,
      profile: 'uuid',
    },
  }),
};

describe('siteReducer', () => {
  it('should handle site creation', () => {
    const sites = siteReducer(fakeState, addSite('newsite'));
    assert.isTrue(sites.has('newsite'));
  });
  it('should allow to toggle site state', () => {
    const sites = siteReducer(
      fakeState,
      toggleSite('test')
    );
    assert.isTrue(sites.get('mozilla').enabled);
    assert.isTrue(sites.get('test').enabled);
  });
  it('should remove site', () => {
    const sites = siteReducer(fakeState, deleteSite('test'));
    assert.isFalse(sites.has('test'));
  });
  it('should update site tag', () => {
    const sites = siteReducer(fakeState, setTag('test', 'local'));
    assert.equal(sites.get('test').tag, 'local');
  });
  it('should update site profile', () => {
    const sites = siteReducer(fakeState, setProfile('test', 'newuuid'));
    assert.equal(sites.get('test').profile, 'newuuid');
  });
  it('should update site length', () => {
    const sites = siteReducer(fakeState, setLength('test', 8));
    assert.equal(sites.get('test').length, 8);
  });
  it('should update site type', () => {
    const sites = siteReducer(fakeState, setType('test', PASSWORD_TYPES.SPECIAL));
    assert.equal(sites.get('test').type, PASSWORD_TYPES.SPECIAL);
  });
  it('should create site settings on update action', () => {
    const sites = siteReducer(fakeState, toggleSite('new'));
    assert.isTrue(sites.has('new'));
    const createdSite = sites.get('new');
    assert.isOk(createdSite.length);
    assert.isOk(createdSite.type);
    assert.isOk(createdSite.tag);
    assert.isOk(createdSite.profile);
  });
  it('should apply initial action upon creation', () => {
    const sites = siteReducer(fakeState, setLength('new', 24));
    assert.equal(sites.get('new').length, 24);
  });
});
