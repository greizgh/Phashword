import React from 'react';

export default class QuickState extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label htmlFor="profile">Profile</label>
          <select id="profile"></select>
          <span className="color-sample" id="color"></span>
        </div>
        <div className="panel-formElements-item">
          <button className="default" id="state">State</button>
        </div>
      </div>
    );
  }
}
