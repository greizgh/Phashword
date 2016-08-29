/* Site actions */
export const ADD_SITE = 'ADD_SITE';
export const DELETE_SITE = 'DELETE_SITE';
export const TOGGLE_SITE = 'TOGGLE_SITE';
export const SET_PROFILE = 'SET_PROFILE';
export const SET_TAG = 'SET_TAG';
export const SET_LENGTH = 'SET_LENGTH';
export const SET_TYPE = 'SET_TYPE';

export function addSite(hostname) {
  return { type: ADD_SITE, hostname: hostname };
}

export function deleteSite(hostname) {
  return { type: DELETE_SITE, hostname: hostname };
}

export function toggleSite(hostname) {
  return { type: TOGGLE_SITE, hostname: hostname };
}

export function setTag(hostname, tag) {
  return { type: SET_TAG, hostname: hostname, tag: tag };
}

export function setProfile(hostname, profileId) {
  return { type: SET_PROFILE, hostname: hostname, profileId: profileId };
}

export function setLength(hostname, length) {
  return { type: SET_LENGTH, hostname: hostname, length: length };
}

export function setType(hostname, passwordType) {
  return { type: SET_TYPE, hostname, passwordType: passwordType };
}
