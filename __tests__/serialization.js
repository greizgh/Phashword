import { Map } from 'immutable';
import { serializeState, deserializeState } from '../src/serialization';
import { state } from '../fixtures';
import { PASSWORD_TYPES } from '../src/constants.js';

describe('serializeState', () => {
  it('should convert immutable structures', () => {
    const storedData = serializeState(state);
    expect(storedData.profiles).toBeInstanceOf(Object);
    expect(storedData.profiles).not.toBeInstanceOf(Map);
    expect(storedData.siteSettings).toBeInstanceOf(Object);
    expect(storedData.siteSettings).not.toBeInstanceOf(Map);
    expect(storedData.siteSettings.mozilla).toBeDefined();
  });
  it('should ignore current profile and site', () => {
    const storedData = serializeState(state);
    expect(storedData.currentSite).not.toBeDefined();
    expect(storedData.currentProfile).not.toBeDefined();
  });
});

describe('deserializeState', () => {
  const state = {
    profiles: {
      uuid: {
        type: PASSWORD_TYPES.NUMERIC,
        length: 8,
        default: true,
        color: '#f0f0f0',
        name: 'Default',
      },
    },
    siteSettings: {},
    currentSite: 'mozilla',
    currentProfile: 'uuid',
  };
  it('should convert js objects', () => {
    const data = deserializeState(state);
    expect(data.profiles).toBeInstanceOf(Map);
    expect(data.profiles.get('uuid').length).toBe(8);
  });
  it('should return undefined on invalid state', () => {
    const data = deserializeState(undefined);
    expect(data).not.toBeDefined();
  });
  it('should ignore current profile and site', () => {
    const data = deserializeState(state);
    expect(data.currentSite).not.toBeDefined();
    expect(data.currentProfile).not.toBeDefined();
  });
});
