import { assert } from 'chai';
import settingsReducer from '../src/reducers/settings';
import { toggleDefaultState } from '../src/actions';

describe('settingsReducer', () => {
  it('should be enabled by default', () => {
    const settings = settingsReducer(undefined, '@init');
    assert.isTrue(settings.defaultState);
  });
  it('should allow to toggle default state', () => {
    const settings = settingsReducer(undefined, toggleDefaultState());
    assert.isFalse(settings.defaultState);
  });
});
