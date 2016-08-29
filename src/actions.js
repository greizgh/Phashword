/* Site actions */
export const ADD_SITE = 'ADD_SITE';
export const UPDATE_SITE = 'UPDATE_SITE';
export const DELETE_SITE = 'DELETE_SITE';
export const TOGGLE_SITE = 'TOGGLE_SITE';

/* Current index actions */
export const SET_CURRENT_PROFILE = 'CHANGE_PROFILE';
export const SET_CURRENT_SITE = 'CHANGE_SITE';

export const TOGGLE_DEFAULT_STATE = 'TOGGLE_DEFAULT_STATE';
export const SET_EXTERNAL_PROMPT = 'SET_EXTERNAL_PROMPT';

export const OPEN_SETTINGS = 'OPEN_SETTINGS';

export function openSettings() {
  return {
    type: OPEN_SETTINGS,
  };
}

export function setCurrentProfile(id) {
  return {
    type: SET_CURRENT_PROFILE,
    id,
  };
}

export function setCurrentSite(id) {
  return {
    type: SET_CURRENT_SITE,
    id,
  };
}

export function toggleSite(id) {
  return {
    type: TOGGLE_SITE,
    id,
  };
}

export function toggleDefaultState() {
  return { type: TOGGLE_DEFAULT_STATE };
}
