/* Profile actions */
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const SET_PROFILE_NAME = 'SET_PROFILE_NAME';
export const SET_PROFILE_COLOR = 'SET_PROFILE_COLOR';
export const SET_DEFAULT_PROFILE = 'SET_DEFAULT_PROFILE';
export const SET_PROFILE_TYPE = 'SET_PROFILE_TYPE';
export const SET_PROFILE_LENGTH = 'SET_PROFILE_LENGTH';
export const SET_PROFILE_KEY = 'SET_PROFILE_KEY';


export function createProfile() {
  return { type: CREATE_PROFILE };
}

export function deleteProfile(id) {
  return { type: DELETE_PROFILE, id };
}

export function setProfileName(id, name) {
  return { type: SET_PROFILE_NAME, id, name };
}

export function setProfileColor(id, color) {
  return { type: SET_PROFILE_COLOR, id, color };
}

export function setDefaultProfile(id) {
  return { type: SET_DEFAULT_PROFILE, id };
}

export function setProfileType(id, passwordType) {
  return { type: SET_PROFILE_TYPE, id, passwordType };
}

export function setProfileLength(id, length) {
  return { type: SET_PROFILE_LENGTH, id, length };
}

export function setProfileKey(id, key) {
  return { type: SET_PROFILE_KEY, id, key };
}
