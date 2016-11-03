import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import Popup from '../../src/components/popup.jsx';

describe('Popup component', () => {
  it('should advertise when it is ready', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === 'POPUP_READY') {
        done();
      }
    }
    const component = mount(
      <Popup
        dispatch={fakeDispatch}
      />
    );
  });
});
