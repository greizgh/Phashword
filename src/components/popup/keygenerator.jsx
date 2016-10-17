import React from 'react';
import Radium from 'radium';
import { panelFormStyle, panelFormItemStyle, labelStyle, inputStyle, textInputStyle } from '../style.js';

class KeyGenerator extends React.Component {
  render() {
    return (
      <div style={panelFormStyle}>
        <div style={panelFormItemStyle}>
          <label style={labelStyle} htmlFor="key">Master key</label>
          <input
            style={[inputStyle, textInputStyle]}
            type="password"
            key={'key'}
            id="key"
            onChange={this.props.requestPassword}
          />
        </div>
        <div style={panelFormItemStyle}>
          <label style={labelStyle} htmlFor="password">Password</label>
          <input
            style={[inputStyle, textInputStyle]}
            type="text"
            key={'password'}
            readOnly
            id="password"
            value={this.props.password}
          />
        </div>
      </div>
    );
  }
}

KeyGenerator.propTypes = {
  password: React.PropTypes.string,
  requestPassword: React.PropTypes.func,
};

export default Radium(KeyGenerator);
