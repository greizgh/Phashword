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
  profiles: [{
    id: 0,
    name: 'default',
    default: true,
    color: '#FF0000',
    type: PASSWORD_TYPES.SPECIAL,
    length: 12,
    privateKey: uuid.v4(),
  }],
};

export const dispatcher = new Rx.Subject();
export const store = dispatcher
  .startWith({ type: '@@init' })
  .scan(appReducer, initialState)
  .shareReplay(1);
