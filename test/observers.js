import { defaultProfileGenerator, defaultProfileSelector } from '../src/observers';
import { store, dispatcher } from '../src/store';
import { createProfile, deleteProfile } from '../src/actions/profile';

describe('generateDefaultProfile', () => {
  it('should create default profile if there is none', () => {
    store.subscribe(defaultProfileGenerator);
    let state;
    store.subscribe((newState) => state=newState);
    assert.equal(state.profiles.length, 1);
    assert.isTrue(state.profiles[0].default);
  });
});

describe('defaultProfileSelector', () => {
  it('should ensure there is always a default profile', () => {
    let state;
    store.subscribe((newState) => state=newState);
    store.subscribe(defaultProfileGenerator);
    store.subscribe(defaultProfileSelector);
    dispatcher.onNext(createProfile());
    dispatcher.onNext(createProfile());
    let defaultId = state.profiles.filter((profile) => profile.default).map((profile) => profile.id)[0];
    dispatcher.onNext(deleteProfile(defaultId));
    assert.equal(state.profiles.filter((profile) => profile.default).length, 1);
  });
});
