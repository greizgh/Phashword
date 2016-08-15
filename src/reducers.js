import {
  SET_CURRENT_PROFILE,
  SET_CURRENT_SITE,
  TOGGLE_SITE,
} from './actions.js';

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

function siteSettings(state = [], action) {
  switch (action.type) {
    case TOGGLE_SITE:
      return [
        state.map((site) => {
          if (site.id === action.id) {
            return { ...site, enabled: !site.enabled };
          }
          return site;
        }),
      ];
    default:
      return state;
  }
}

function profiles(state = [], action) {
  // TODO
  return state;
}

export function appReducer(state, action) {
  return {
    currentSite: currentSite(state.currentSite, action),
    currentProfile: currentProfile(state.currentProfile, action),
    siteSettings: siteSettings(state.siteSettings, action),
    profiles: profiles(state.profiles, action),
  };
}
