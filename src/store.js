import Rx from 'rx';
import { appReducer } from './reducers';
import { PASSWORD_TYPES } from './constants';

const initialState = {
  currentSite: 1,
  currentProfile: 1,
  siteSettings: [{
    id: 1,
    profile: 1,
    tag: 'firefox',
    site: 'mozilla.org',
    enabled: true,
    length: 12,
    type: PASSWORD_TYPES.SPECIAL,
  }],
  profiles: [{
    id: 1,
    name: 'default',
    color: '#FF0000',
    type: PASSWORD_TYPES.SPECIAL,
    length: 12,
    privateKey: 'qkdjfmqskfmqsdkfjmsdkfm',
  }],
};

export const dispatcher = new Rx.Subject();
export const store = dispatcher
  .startWith({ type: '@@init' })
  .scan(appReducer, initialState)
  .share();
