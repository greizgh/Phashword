const assert = require('chai').assert;
const store = require('../src/store').store;

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
});
