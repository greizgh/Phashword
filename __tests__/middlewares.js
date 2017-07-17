import { assert } from 'chai';
import { createStore, applyMiddleware } from 'redux';
import appReducer from '../src/reducers.js';
import { saveOnHash } from '../src/middlewares/site.js';
import { setCurrentSite } from '../src/actions.js';

describe('middleware', () => {
  const store = createStore(appReducer, applyMiddleware(saveOnHash));
  it('should save site on hash request', () => {
    store.dispatch(setCurrentSite('test'));
    store.dispatch({ type: 'REQUEST_PASS' });
    assert.isTrue(store.getState().siteSettings.has('test'));
  });
});
