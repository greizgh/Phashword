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
  selectStyle,
} from '../style.js';

const SiteProfile = (props) => (
  <div style={panelFormStyle}>
    <div style={panelFormItemStyle}>
      <label htmlFor="tag" style={labelStyle}>
        {props.translate('hash.tag')}
      </label>
      <input
        type="text"
        style={[inputStyle, textInputStyle]}
        key={'tag'}
        id="tag"
        size="20"
        value={props.tag}
        onChange={props.onChangeTag}
      />
    </div>
    <div style={panelFormItemStyle}>
      <label style={labelStyle} htmlFor="password_length">
        {props.translate('hash.length')}
      </label>
      <input
        type="number"
        style={[inputStyle, textInputStyle]}
        key={'password'}
        id="password_length"
        min="1"
        value={props.length}
        onChange={props.onChangeLength}
      />
    </div>
    <div style={[panelFormItemStyle, panelLastFormItemStyle]}>
      <label style={labelStyle} htmlFor="password_type">
        {props.translate('hash.type')}
      </label>
      <select
        style={selectStyle}
        id="password_type"
        value={props.type}
        onChange={props.onChangeType}
      >
        <option value={1}>
          {props.translate('type.special')}
        </option>
        <option value={2}>
          {props.translate('type.alphanum')}
        </option>
        <option value={3}>
          {props.translate('type.numeric')}
        </option>
      </select>
    </div>
  </div>
);

SiteProfile.propTypes = {
  tag: PropTypes.string,
  length: PropTypes.number,
  type: PropTypes.number,
  onChangeType: PropTypes.func,
  onChangeLength: PropTypes.func,
  onChangeTag: PropTypes.func,
  translate: PropTypes.func,
};

SiteProfile.defaultProps = {
  translate: (id) => id,
};

export default Radium(SiteProfile);
