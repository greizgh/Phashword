import { Map } from 'immutable';
import {
  ADD_SITE,
  DELETE_SITE,
  TOGGLE_SITE,
  SET_PROFILE,
  SET_TAG,
  SET_LENGTH,
  SET_TYPE,
} from '../actions/site';

export default function sitesReducer(state = new Map(), action) {
  switch (action.type) {
    case ADD_SITE:
      return state.set(action.id, {
        profile: action.profile,
        tag: action.tag,
        length: action.length,
        type: action.passwordType,
        enabled: action.enabled,
      });
    case TOGGLE_SITE:
      return state.update(action.id, (site) => ({ ...site, enabled: !site.enabled }));
    case DELETE_SITE:
      return state.delete(action.id);
    case SET_PROFILE:
      return state.update(action.id, (site) => ({ ...site, profileId: action.profileId }));
    case SET_LENGTH:
      return state.update(action.id, (site) => ({ ...site, length: action.length }));
    case SET_TAG:
      return state.update(action.id, (site) => ({ ...site, tag: action.tag }));
    case SET_TYPE:
      return state.update(action.id, (site) => ({ ...site, type: action.passwordType }));
    default:
      return state;
  }
}
