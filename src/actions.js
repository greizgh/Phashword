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

export function toggleDefaultState() {
  return { type: TOGGLE_DEFAULT_STATE };
}
