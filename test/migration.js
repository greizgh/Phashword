import { expect } from 'chai';
import migrate from '../src/migration.js';
import { data, empty } from './v1-data.js';
import { PASSWORD_TYPES } from '../src/constants.js';

describe('Migration from v1', () => {
  const state = migrate(data);
  it('should return an empty state if there is no v1 data', () => {
    const emptyState = migrate(empty);
    expect(emptyState).to.be.an('object');
    expect(emptyState).to.deep.equal({});
  });
  it('should create as many profiles as in v1', () => {
    expect(state.profiles.size).to.equal(2);
  });
  it('should create as many sites as in v1', () => {
    expect(state.siteSettings.size).to.equal(6);
  });
  it('should mark first profile as default', () => {
    expect(state.profiles.first()).to.have.property('default', true);
    expect(state.profiles.last()).to.have.property('default', false);
  });
  it('should migrate settings', () => {
    expect(state.settings.defaultState).to.be.true;
    expect(state.settings.toggleKey).to.equal('Escape');
  });
  it('should migrate profile data', () => {
    const profile = state.profiles.first();
    expect(profile.name).to.equal('Default');
    expect(profile.color).to.equal(data.profiles[0].color);
    expect(profile.length).to.equal(data.profiles[0].password_length);
    expect(profile.type).to.equal(data.profiles[0].password_type);
    expect(profile.key).to.equal(data.profiles[0].private_key);
  });
  it('should migrate site data', () => {
    const site = state.siteSettings.get('mozilla');
    expect(site.tag).to.equal('mozilla');
    expect(site.enabled).to.be.true;
    expect(site.length).to.equal(12);
    expect(site.type).to.equal(PASSWORD_TYPES.SPECIAL);
    expect(site.profile).to.exist;
  });
  it('should migrate special settings', () => {
    const site = state.siteSettings.get('alpha');
    const profileKey = state.profiles.keySeq().last();
    expect(site.type).to.equal(PASSWORD_TYPES.ALPHANUMERIC);
    expect(site.profile).to.equal(profileKey);
  });
  it('should migrate site type and length', () => {
    const site = state.siteSettings.get('num');
    expect(site.type).to.equal(PASSWORD_TYPES.NUMERIC);
    expect(site.length).to.equal(8);
  });
  it('should migrate site status', () => {
    const site = state.siteSettings.get('google');
    expect(site.enabled).to.be.false;
  });
  it('should handle incomplete sites', () => {
    const site = state.siteSettings.get('incomplete');
    expect(site.length).to.equal(parseInt(data.profiles[0].password_length, 10));
    expect(site.type).to.equal(parseInt(data.profiles[0].password_type, 10));
  });
});
