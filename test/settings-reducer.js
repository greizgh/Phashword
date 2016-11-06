import { assert } from 'chai';
import settingsReducer from '../src/reducers/settings';
import { toggleDefaultState, setToggleKey } from '../src/actions';

describe('settingsReducer', () => {
  it('should be disabled by default', () => {
    const settings = settingsReducer(undefined, '@init');
    assert.isFalse(settings.defaultState);
  });
  it('should allow to toggle default state', () => {
    const settings = settingsReducer(undefined, toggleDefaultState());
    assert.isTrue(settings.defaultState);
  });
  it('should use Escape key as quick toggle key', () => {
    const settings = settingsReducer(undefined, '@init');
    assert.equal('Esc', settings.toggleKey);
  });
  it('should allow to change toogle key', () => {
    const settings = settingsReducer(undefined, setToggleKey('F2'));
    assert.equal('F2', settings.toggleKey);
  });
});
