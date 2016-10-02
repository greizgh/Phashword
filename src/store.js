import Rx from 'rx';
import { Map } from 'immutable';
import appReducer from './reducers';
import { PASSWORD_TYPES } from './constants';

const initialState = {
  currentSite: null,
  currentProfile: null,
  siteSettings: Map(),
  profiles: Map(),
};

export const dispatcher = new Rx.BehaviorSubject({ type: '@@init' });
export const store = dispatcher
  .scan(appReducer, initialState)
  .shareReplay(1);
