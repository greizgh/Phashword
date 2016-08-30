import Rx from 'rx';
import uuid from 'uuid';
import { appReducer } from './reducers';
import { PASSWORD_TYPES } from './constants';

const initialState = {
  currentSite: 0,
  currentProfile: 0,
  siteSettings: [{
    id: 0,
    profile: 1,
    tag: 'firefox',
    site: 'mozilla.org',
    enabled: true,
    length: 12,
    type: PASSWORD_TYPES.SPECIAL,
  }],
  profiles: [],
};

export const dispatcher = new Rx.BehaviorSubject({ type: '@@init' });
export const store = dispatcher
  .scan(appReducer, initialState)
  .shareReplay(1);

export function registerObserver({onAction, onState}) {
  if (onAction) {
    dispatcher.subscribe(onAction);
  }
  if (onState) {
    store.subscribe(onState);
  }
}
