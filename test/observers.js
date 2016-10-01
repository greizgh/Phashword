import { defaultProfileGenerator, defaultProfileSelector, siteSettingsSaver } from '../src/observers';
import { store, dispatcher } from '../src/store';
import { createProfile, deleteProfile } from '../src/actions/profile';
import { setTag } from '../src/actions/site';

describe('generateDefaultProfile', () => {
  it('should create default profile if there is none', () => {
    store.subscribe(defaultProfileGenerator);
    let state;
    store.subscribe((newState) => state=newState);
    assert.equal(state.profiles.size, 1);
    assert.isTrue(state.profiles.first().default);
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
    let defaultId = state.profiles.filter((profile) => profile.default).map((profile) => profile.id).first();
    dispatcher.onNext(deleteProfile(defaultId));
    assert.equal(state.profiles.count((profile) => profile.default), 1);
  });
});

describe('siteSettingsSaver', () => {
  it('should store site settings on change', () => {
    let state;
    store.subscribe((newState) => { state = newState; });
    dispatcher.subscribe(siteSettingsSaver);
    dispatcher.onNext(setTag('test', 'tag'));
    assert.equal(state.siteSettings.get('test').tag, 'tag');
  });
});
