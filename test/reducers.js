'use strict';

const appReducer = require('../src/reducers').appReducer;
const assert = require('chai').assert;
const setCurrentProfile = require('../src/actions').setCurrentProfile;
const setCurrentSite = require('../src/actions').setCurrentSite;

describe('appReducer', () => {
  it('should handle profile change', () => {
    const state = appReducer({}, setCurrentProfile(2));
    assert.equal(state.currentProfile, 2);
  });
});
