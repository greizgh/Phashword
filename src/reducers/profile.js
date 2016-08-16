import {
  ADD_PROFILE,
  DELETE_PROFILE,
  UPDATE_PROFILE,
} from '../actions';

export default function profilesReducer(state = [], action) {
  switch (action.type) {
    case ADD_PROFILE:
      // TODO generate ID
      return state.push(action.profile);
    case DELETE_PROFILE:
      return [
        state.map((profile) => {
          if (action.id !== profile.id) {
            return profile;
          }
        })
      ];
    case UPDATE_PROFILE:
      return [
        state.map((profile) => {
          if (action.profile.id === profile.id) {
            return action.profile;
          } else {
            return profile;
          }
        })
      ];
    default:
      return state;
  }
}
