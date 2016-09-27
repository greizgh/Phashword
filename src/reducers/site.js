import {
  ADD_SITE,
  DELETE_SITE,
  TOGGLE_SITE,
  SET_PROFILE,
  SET_TAG,
  SET_LENGTH,
  SET_TYPE,
} from '../actions/site';
import { Map } from 'immutable';

export default function sitesReducer(state = Map(), action) {
  switch (action.type) {
    case ADD_SITE:
      // Todo populate site settings
      return state.set(action.id, {});
    case TOGGLE_SITE:
      return state.update(action.id, (site) => {
        return { ...site, enabled: !site.enabled };
      });
    case DELETE_SITE:
      return state.delete(action.id);
    case SET_PROFILE:
      return state.update(action.id, (site) => {
        return { ...site, profileId: action.profileId };
      });
    case SET_LENGTH:
      return state.update(action.id, (site) => {
        return { ...site, length: action.length };
      });
    case SET_TAG:
      return state.update(action.id, (site) => {
        return { ...site, tag: action.tag };
      });
    case SET_TYPE:
      return state.update(action.id, (site) => {
        return { ...site, type: action.passwordType };
      });
    default:
      return state;
  }
}
