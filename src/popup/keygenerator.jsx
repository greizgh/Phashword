import React from 'react';

export default class KeyGenerator extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label htmlFor="key">Master key</label>
          <input type="password" id="key" onChange={this.props.requestPassword} />
        </div>
        <div className="panel-formElements-item">
          <label htmlFor="password">Password</label>
          <input type="text" readOnly id="password" value={this.props.password} />
        </div>
      </div>
    );
  }
}

KeyGenerator.propTypes = {
  password: React.PropTypes.string,
  requestPassword: React.PropTypes.func,
};
