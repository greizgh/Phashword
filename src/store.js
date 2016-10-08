import Rx from 'rx';
import { Map } from 'immutable';
import appReducer from './reducers';

const initialState = {
  currentSite: null,
  currentProfile: null,
  siteSettings: new Map(),
  profiles: new Map(),
};

export const dispatcher = new Rx.BehaviorSubject({ type: '@@init' });
export const store = dispatcher
  .scan(appReducer, initialState)
  .shareReplay(1);
