import { createProfile, setDefaultProfile } from './actions/profile';
import { dispatcher, store } from './store';
import { TOGGLE_SITE, SET_PROFILE, SET_TAG, SET_TYPE, SET_LENGTH, addSite } from './actions/site';
import { getSiteSettings, isSiteComplete } from './utils';

let lastKnownState;
store.subscribe((state) => { lastKnownState = state; });

// Make sure there is a profile and if there is only one make it default
export function defaultProfileObserver(state) {
  // Make sure there is at least one profile
  if (state.profiles.isEmpty()) {
    dispatcher.onNext(createProfile());
  }
  // If there is not default profile, default to first one
  if (!state.profiles.isEmpty() && state.profiles.count((profile) => profile.default) === 0) {
    dispatcher.onNext(setDefaultProfile(state.profiles.slice(0).keySeq().first()));
  }
}

// Save site settings if default values are changed
export function siteSettingsSaver(action) {
  const siteActions = [TOGGLE_SITE, SET_PROFILE, SET_TAG, SET_TYPE, SET_LENGTH];
  const siteExists = lastKnownState.siteSettings.has(action.id);
  const complete = isSiteComplete(lastKnownState.siteSettings.get(action.id, {}));
  if (siteActions.includes(action.type) && (!siteExists || !complete)) {
    const siteSettings = getSiteSettings(lastKnownState);
    // Create target siteSettings
    dispatcher.onNext(addSite(
      action.id,
      siteSettings.profile,
      siteSettings.tag,
      siteSettings.length,
      siteSettings.type,
      siteSettings.enabled
    ));
    if (!siteExists) {
      // Replay initial action as it couldn't be handled
      dispatcher.onNext(action);
    }
  }
}
