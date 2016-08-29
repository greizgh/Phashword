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
  return { type: DELETE_PROFILE, id: id };
}

export function setProfileName(id, name) {
  return { type: SET_PROFILE_NAME, id: id, name: name };
}

export function setProfileColor(id, color) {
  return { type: SET_PROFILE_COLOR, id: id, color: color };
}

export function setDefaultProfile(id) {
  return { type: SET_DEFAULT_PROFILE, id: id };
}

export function setProfileType(id, type) {
  return { type: SET_PROFILE_TYPE, id: id, passwordType: type };
}

export function setProfileLength(id, length) {
  return { type: SET_PROFILE_LENGTH, id: id, length: length };
}

export function setProfileKey(id, key) {
  return { type: SET_PROFILE_KEY, id: id, key: key };
}
