import React from 'react';
import { assert } from 'chai';
import { mount } from 'enzyme';
import Settings from '../../src/components/admin/settings.jsx';

describe('Settings component', () => {
  it('should advertise when it is ready', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === 'SETTINGS_READY') {
        done();
      }
    };
    mount(<Settings dispatch={fakeDispatch} />);
  });
});
