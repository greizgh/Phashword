import React from 'react';
import { mount } from 'enzyme';
import Popup from '../../src/components/popup.jsx';
import { TOGGLE_SITE } from '../../src/actions/site.js';

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
    popup.find('input[type="checkbox"]').simulate('change');
  });
});
