import { createProfile, setDefaultProfile } from './actions/profile';
import { dispatcher } from './store';

// Make sure there is a profile and if there is only one make it default
export function defaultProfileGenerator(state) {
  if (state.profiles.length === 0) {
    dispatcher.onNext(createProfile());
  }
  if (state.profiles.length === 1 && !state.profiles[0].default) {
    dispatcher.onNext(setDefaultProfile(state.profiles[0].id));
  }
}

// Make sure there is a default profile.
// Useful after profile deletion
export function defaultProfileSelector (state) {
  if (state.profiles.filter((profile) => profile.default).length === 0) {
    dispatcher.onNext(setDefaultProfile(state.profiles[0].id));
  }
}
