import Rx from 'rx';
import { Map } from 'immutable';
import appReducer from './reducers';
import { PASSWORD_TYPES } from './constants';

const initialState = {
  currentSite: 0,
  currentProfile: 0,
  siteSettings: Map({
    mozilla: {
      id: 0,
      profile: 1,
      tag: 'firefox',
      enabled: true,
      length: 12,
      type: PASSWORD_TYPES.SPECIAL,
    },
  }),
  profiles: [],
};

export const dispatcher = new Rx.BehaviorSubject({ type: '@@init' });
export const store = dispatcher
  .scan(appReducer, initialState)
  .shareReplay(1);
