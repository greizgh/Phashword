import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Tabs, Pane } from '../src/components/popup/tabs.jsx';
import React from 'react';

describe('Tab component', () => {
  it('should display list of tabs', () => {
    const component = shallow(
        <Tabs>
        <Pane label="test1"><p>pane 1 content</p></Pane>
        <Pane label="test2"><p>pane 2 content</p></Pane>
        <Pane label="test3"><p>pane 3 content</p></Pane>
        </Tabs>
    );
    assert.equal(component.find('.panel-section-tabs-button').length, 3);
  });
});
