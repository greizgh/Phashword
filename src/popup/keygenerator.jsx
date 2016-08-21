import React from 'react';

export default class KeyGenerator extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label htmlFor="key">Master key</label>
          <input type="password" id="key"/>
        </div>
        <div className="panel-formElements-item">
          <label htmlFor="password">Password</label>
          <input type="text" readOnly id="password"/>
          <button className="expander"></button>
        </div>
      </div>
    );
  }
}
