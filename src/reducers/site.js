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
import { DELETE_PROFILE } from '../actions/profile.js';
import { getSiteSettings } from '../utils.js';

const updateActions = [TOGGLE_SITE, SET_PROFILE, SET_LENGTH, SET_TAG, SET_TYPE];

export default function sitesReducer(state = { siteSettings: new Map() }, action) {
  let sites = state.siteSettings;
  if (!sites) {
    sites = new Map();
  }
  if (updateActions.includes(action.type) && !state.siteSettings.has(action.id)) {
    // Update action on a non existing site
    // Let's create one with current default values
    const newSettings = getSiteSettings(state);
    sites = sites.set(action.id, newSettings);
  }
  switch (action.type) {
    case ADD_SITE:
      return sites.set(action.id, {
        profile: action.profile,
        tag: action.tag,
        length: action.length,
        type: action.passwordType,
        enabled: action.enabled,
      });
    case TOGGLE_SITE:
      return sites.update(action.id, (site) => ({ ...site, enabled: !site.enabled }));
    case DELETE_SITE:
      return sites.delete(action.id);
    case SET_PROFILE:
      return sites.update(action.id, (site) => ({
        ...site, profile: action.profile,
      }));
    case SET_LENGTH:
      return sites.update(action.id, (site) => ({ ...site, length: action.length }));
    case SET_TAG:
      return sites.update(action.id, (site) => ({ ...site, tag: action.tag }));
    case SET_TYPE:
      return sites.update(action.id, (site) => ({
        ...site, type: action.passwordType,
      }));
    case DELETE_PROFILE:
      return sites.filter(site => site.profile !== action.id);
    default:
      return sites;
  }
}
