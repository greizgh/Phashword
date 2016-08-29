import {
  ADD_SITE,
  DELETE_SITE,
  TOGGLE_SITE,
  SET_PROFILE,
  SET_TAG,
  SET_LENGTH,
  SET_TYPE,
} from '../actions/site';

export default function sitesReducer(state = [], action) {
  switch (action.type) {
  case ADD_SITE:
    return [ ...state, {hostname: action.hostname}];
  case TOGGLE_SITE:
    return state.map((site) => {
      if (site.hostname === action.hostname) {
        return { ...site, enabled: !site.enabled };
      }
      return site;
    });
  case DELETE_SITE:
    return state.filter((site) => {
      return action.hostname !== site.hostname;
    });
  case SET_PROFILE:
    return state.map((site) => {
      if (action.hostname === site.hostname) {
        return { ...site, profileId: action.profileId };
      } else {
        return site;
      }
    });
  case SET_LENGTH:
    return state.map((site) => {
      if (action.hostname === site.hostname) {
        return { ...site, length: action.length };
      } else {
        return site;
      }
    });
  case SET_TAG:
    return state.map((site) => {
      if (action.hostname === site.hostname) {
        return { ...site, tag: action.tag };
      } else {
        return site;
      }
    });
  case SET_TYPE:
    return state.map((site) => {
      if (action.hostname === site.hostname) {
        return { ...site, type: action.passwordType };
      } else {
        return site;
      }
    });
  default:
    return state;
  }
}
