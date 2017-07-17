import React from 'react';
import { mount } from 'enzyme';
import GlobalSettings from '../../src/components/admin/global-settings.jsx';
import { TOGGLE_DEFAULT_STATE, SET_TOGGLE_KEY } from '../../src/actions.js';

describe('Global settings component', () => {
  it('should allow to toggle default status', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === TOGGLE_DEFAULT_STATE) {
        done();
      }
    };
    const settings = mount(
      <GlobalSettings defaultState={false} toggleKey={'Escape'} dispatch={fakeDispatch} />
    );
    settings.find('input[type="checkbox"]').simulate('change');
  });
  it('should allow to change toggle key', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === SET_TOGGLE_KEY) {
        done();
      }
    };
    const settings = mount(
      <GlobalSettings defaultState={false} toggleKey={'Escape'} dispatch={fakeDispatch} />
    );
    settings.find('select').simulate('change');
  });
});
