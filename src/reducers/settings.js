import { TOGGLE_DEFAULT_STATE, SET_TOGGLE_KEY } from '../actions';

const defaultSettings = {
  defaultState: false,
  toggleKey: 'Esc',
};

export default function settingsReducer(state = defaultSettings, action) {
  switch (action.type) {
    case TOGGLE_DEFAULT_STATE:
      return { ...state, defaultState: !state.defaultState };
    case SET_TOGGLE_KEY:
      return { ...state, toggleKey: action.key };
    default:
      return state;
  }
}
