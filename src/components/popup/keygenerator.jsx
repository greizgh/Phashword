import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  panelFormStyle,
  panelFormItemStyle,
  panelLastFormItemStyle,
  labelStyle,
  inputStyle,
  textInputStyle,
} from '../style.js';

const KeyGenerator = (props) => (
  <div style={panelFormStyle}>
    <div style={panelFormItemStyle}>
      <label style={labelStyle} htmlFor="key">
        {props.translate('master_key')}
      </label>
      <input
        style={[inputStyle, textInputStyle]}
        type="password"
        key={'key'}
        id="key"
        value={props.masterKey}
        onChange={props.requestPassword}
      />
    </div>
    <div style={[panelFormItemStyle, panelLastFormItemStyle]}>
      <label style={labelStyle} htmlFor="password">
        {props.translate('password')}
      </label>
      <input
        style={[inputStyle, textInputStyle]}
        type="text"
        key={'password'}
        readOnly
        id="password"
        value={props.password}
      />
    </div>
  </div>
);

KeyGenerator.propTypes = {
  password: PropTypes.string,
  masterKey: PropTypes.string,
  requestPassword: PropTypes.func,
  translate: PropTypes.func,
};

KeyGenerator.defaultProps = {
  translate: (id) => id,
};

export default Radium(KeyGenerator);
