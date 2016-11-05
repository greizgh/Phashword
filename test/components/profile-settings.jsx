import React from 'react';
import { mount } from 'enzyme';
import ProfileSettings from '../../src/components/admin/profileSettings.jsx';
import { CREATE_PROFILE } from '../../src/actions/profile.js';

describe('ProfileSettings component', () => {
  it('should allow new profile creation', (done) => {
    const fakeDispatch = (action) => {
      if (action.type === CREATE_PROFILE) {
        done();
      }
    };
    const component = mount(
      <ProfileSettings dispatch={fakeDispatch} profiles={[]} />
    );
    component.find('button').simulate('click');
  });
});
