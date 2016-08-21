import React from 'react';

export default class KeyGenerator extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label for="key">Master key</label>
          <input type="password" id="key"/>
        </div>
        <div className="panel-formElements-item">
          <label for="password">Password</label>
          <input type="text" readonly id="password"/>
          <button className="expander"></button>
        </div>
      </div>
    );
  }
}
