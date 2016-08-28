const assert = require('chai').assert;
const store = require('../src/store').store;
const dispatcher = require('../src/store').dispatcher;

describe('Store', () => {
  it('should provide default store', () => {
    let currentProfile = 0;
    store.subscribe(
      (state) => {
        currentProfile = state.currentProfile;
      }
    );
    assert.ok(currentProfile);
  });
  it('should handle multiple subscriptions', () => {
    let call1 = false;
    let call2 = false;
    store.subscribe(() => { call1 = true; });
    store.subscribe(() => { call2 = true; });
    assert.isTrue(call1, 'First subscription');
    assert.isTrue(call2, 'Second subscription');
  });
});

describe('Dispatcher', () => {
  it('should trigger state change', () => {
    let call = 0;
    store.subscribe(() => { call++; });
    dispatcher.onNext({ type: 'test' });
    assert.equal(call, 2);
  });
});
