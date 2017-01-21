import React from 'react';
import { mount } from 'enzyme';
import Popup from '../../src/components/popup.jsx';
import { TOGGLE_SITE, SET_PROFILE } from '../../src/actions/site.js';

describe('Popup component', () => {
  it('should advertise when it is ready', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === 'POPUP_READY') {
        done();
      }
    };
    mount(<Popup dispatch={fakeDispatch} />);
  });
  it('should allow to toggle site', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === TOGGLE_SITE) {
        done();
      }
    };
    const popup = mount(<Popup dispatch={fakeDispatch} />);
    popup.find('#state').simulate('change');
  });
  it('should allow to change profile', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === SET_PROFILE) {
        done();
      }
    };
    const popup = mount(<Popup dispatch={fakeDispatch} />);
    popup.find('#profile').simulate('change');
  });
});
