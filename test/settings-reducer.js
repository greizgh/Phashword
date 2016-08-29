import settingsReducer from '../src/reducers/settings';
import { toggleDefaultState } from '../src/actions';
import { assert } from 'chai';

describe('settingsReducer', () => {
  it('should be enabled by default', () => {
    let settings = settingsReducer(undefined, '@init');
    assert.isTrue(settings.defaultState);
  });
  it('should allow to toggle default state', () => {
    let settings = settingsReducer(undefined, toggleDefaultState());
    assert.isFalse(settings.defaultState);
  });
});
