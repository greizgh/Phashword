import { Map } from 'immutable';
import uuid from 'uuid';
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
import { PASSWORD_TYPES, DEFAULT_COLOR, DEFAULT_LENGTH } from '../constants';

function getNewProfile(defaultProfile=false) {
  return {
    name: 'Default',
    default: defaultProfile,
    color: DEFAULT_COLOR,
    length: DEFAULT_LENGTH,
    type: PASSWORD_TYPES.SPECIAL,
    key: uuid.v4(),
  };
}

const defaultState = new Map().set(uuid.v4(), getNewProfile(true));

export default function profilesReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_PROFILE:
      return state.set(uuid.v4(), getNewProfile());
    case DELETE_PROFILE:
      return state.delete(action.id);
    case SET_DEFAULT_PROFILE:
      return state
        .map((profile) => ({ ...profile, default: false }))
        .update(action.id, (profile) => ({ ...profile, default: true }));
    case SET_PROFILE_NAME:
      return state.update(action.id, (profile) => ({ ...profile, name: action.name }));
    case SET_PROFILE_COLOR:
      return state.update(action.id, (profile) => ({ ...profile, color: action.color }));
    case SET_PROFILE_TYPE:
      return state.update(action.id, (profile) => ({ ...profile, type: action.passwordType }));
    case SET_PROFILE_LENGTH:
      return state.update(action.id, (profile) => ({ ...profile, length: action.length }));
    case SET_PROFILE_KEY:
      return state.update(action.id, (profile) => ({ ...profile, key: action.key }));
    default:
      return state;
  }
}
