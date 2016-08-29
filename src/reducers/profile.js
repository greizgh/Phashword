import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  SET_PROFILE_NAME,
  SET_PROFILE_COLOR,
  SET_DEFAULT_PROFILE,
  SET_PROFILE_TYPE,
  SET_PROFILE_LENGTH,
  SET_PROFILE_KEY,
} from '../actions/profile';

export default function profilesReducer(state = [], action) {
  switch (action.type) {
  case CREATE_PROFILE:
    // TODO generate ID
    state.push(action.profile);
    return state;
  case DELETE_PROFILE:
    return state.filter((profile) => {
      return profile.id !== action.id;
    });
  case SET_DEFAULT_PROFILE:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, default: true };
      } else {
        return { ...profile, default: false };
      }
    });
  case SET_PROFILE_NAME:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, name: action.name };
      } else {
        return profile;
      }
    });
  case SET_PROFILE_COLOR:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, color: action.color };
      } else {
        return profile;
      }
    });
  case SET_PROFILE_TYPE:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, type: action.passwordType };
      } else {
        return profile;
      }
    });
  case SET_PROFILE_LENGTH:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, length: action.length };
      } else {
        return profile;
      }
    });
  case SET_PROFILE_KEY:
    return state.map((profile) => {
      if (action.id === profile.id) {
        return { ...profile, key: action.key };
      } else {
        return profile;
      }
    });
  default:
    return state;
  }
}
