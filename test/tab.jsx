import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import { Tabs, Pane } from '../src/components/popup/tabs.jsx';

describe('Tab component', () => {
  const component = shallow(
    <Tabs>
      <Pane label="test1"><p className="tab1">pane 1 content</p></Pane>
      <Pane label="test2"><p className="tab2">pane 2 content</p></Pane>
      <Pane label="test3"><p className="tab3">pane 3 content</p></Pane>
    </Tabs>
  );
  it('should display list of tabs', () => {
    assert.equal(component.find('.Tabs__header__button').length, 3);
  });
  it('should display first tab content', () => {
    assert.equal(component.find('.tab1').length, 1);
    assert.equal(component.find('.tab2').length, 0);
    assert.equal(component.find('.tab3').length, 0);
  });
  it('should display selected tab', () => {
    component.find('.Tabs__header__button').last().simulate('click');
    assert.equal(component.find('.tab3').length, 1);
  });
});
