import {
  SET_CURRENT_PROFILE,
  SET_CURRENT_SITE,
} from './actions.js';
import profilesReducer from './reducers/profile';
import sitesReducer from './reducers/site';
import settingsReducer from './reducers/settings';

function currentProfile(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_PROFILE:
      return action.id;
    default:
      return state;
  }
}

function currentSite(state = null, action) {
  switch (action.type) {
    case SET_CURRENT_SITE:
      return action.id;
    default:
      return state;
  }
}

export default function appReducer(state, action) {
  return {
    currentSite: currentSite(state.currentSite, action),
    currentProfile: currentProfile(state.currentProfile, action),
    siteSettings: sitesReducer(state.siteSettings, action),
    profiles: profilesReducer(state.profiles, action),
    settings: settingsReducer(state.settings, action),
  };
}
