/* Site actions */
export const ADD_SITE = 'ADD_SITE';
export const DELETE_SITE = 'DELETE_SITE';
export const TOGGLE_SITE = 'TOGGLE_SITE';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_TAG = 'SET_TAG';
export const SET_LENGTH = 'SET_LENGTH';
export const SET_TYPE = 'SET_TYPE';

export function addSite(id, profile, tag, length, passwordType, enabled) {
  return { type: ADD_SITE, id, profile, tag, length, passwordType, enabled };
}

export function deleteSite(id) {
  return { type: DELETE_SITE, id };
}

export function toggleSite(id) {
  return { type: TOGGLE_SITE, id };
}

export function setTag(id, tag) {
  return { type: SET_TAG, id, tag };
}

export function setProfile(id, profile) {
  return { type: SET_PROFILE, id, profile };
}

export function setLength(id, length) {
  return { type: SET_LENGTH, id, length };
}

export function setType(id, passwordType) {
  return { type: SET_TYPE, id, passwordType };
}
