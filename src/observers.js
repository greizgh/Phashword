import { createProfile, setDefaultProfile } from './actions/profile';
import { dispatcher } from './store';

export const defaultProfileGenerator = {
  onState: function(state) {
    if (state.profiles.length === 0) {
      dispatcher.onNext(createProfile());
    }
    if (state.profiles.length === 1 && !state.profiles[0].default) {
      dispatcher.onNext(setDefaultProfile(state.profiles[0].id));
    }
  }
};
