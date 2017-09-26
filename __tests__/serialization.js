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
});

describe('deserializeState', () => {
  it('should convert js objects', () => {
    const data = deserializeState({
      state: {
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
      }
    });
    expect(data.profiles).toBeInstanceOf(Map);
  });
  it('should return undefined on invalid state', () => {
    const data = deserializeState({});
    expect(data).not.toBeDefined();
  });
});
