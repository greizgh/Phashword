import { TOGGLE_DEFAULT_STATE } from '../actions';

const defaultSettings = {
  defaultState: true,
};

export default function settingsReducer(state = defaultSettings, action) {
  switch (action.type) {
    case TOGGLE_DEFAULT_STATE:
      return { ...state, defaultState: !state.defaultState };
    default:
      return state;
  }
}
