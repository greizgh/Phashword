import {
  CREATE_PROFILE,
  DELETE_PROFILE,
  SET_PROFILE_NAME,
  SET_PROFILE_COLOR,
  SET_PROFILE_DEFAULT,
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
    return state.map((profile) => {
      if (action.id !== profile.id) {
        return profile;
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
  default:
    return state;
  }
}
