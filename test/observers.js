import { defaultProfileGenerator } from '../src/observers';
import { store, dispatcher, registerObserver } from '../src/store';

describe('generateDefaultProfile', () => {
  it('should create default profile if there is none', () => {
    registerObserver(defaultProfileGenerator);
    let state;
    store.subscribe((newState) => state=newState);
    assert.equal(state.profiles.length, 1);
    assert.isTrue(state.profiles[0].default);
  });
});
