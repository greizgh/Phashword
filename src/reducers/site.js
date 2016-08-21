import {
  ADD_SITE,
  UPDATE_SITE,
  DELETE_SITE,
  TOGGLE_SITE
} from '../actions';

export default function sitesReducer(state = [], action) {
  switch (action.type) {
    case ADD_SITE:
      // TODO generate ID
      return state.push(action.site);
    case TOGGLE_SITE:
      return [
        state.map((site) => {
          if (site.id === action.id) {
            return { ...site, enabled: !site.enabled };
          }
          return site;
        }),
      ];
    case DELETE_SITE:
      return [
        state.map((profile) => {
          if (action.id !== profile.id) {
            return profile;
          }
        })
      ];
    case UPDATE_SITE:
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
