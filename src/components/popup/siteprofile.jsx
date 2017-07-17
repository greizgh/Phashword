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

class SiteProfile extends React.Component {
  render() {
    return (
      <div style={panelFormStyle}>
        <div style={panelFormItemStyle}>
          <label htmlFor="tag" style={labelStyle}>
            {this.props.translate('hash.tag')}
          </label>
          <input
            type="text"
            style={[inputStyle, textInputStyle]}
            key={'tag'}
            id="tag"
            size="20"
            value={this.props.tag}
            onChange={this.props.onChangeTag}
          />
        </div>
        <div style={panelFormItemStyle}>
          <label style={labelStyle} htmlFor="password_length">
            {this.props.translate('hash.length')}
          </label>
          <input
            type="number"
            style={[inputStyle, textInputStyle]}
            key={'password'}
            id="password_length"
            min="1"
            value={this.props.length}
            onChange={this.props.onChangeLength}
          />
        </div>
        <div style={[panelFormItemStyle, panelLastFormItemStyle]}>
          <label style={labelStyle} htmlFor="password_type">
            {this.props.translate('hash.type')}
          </label>
          <select
            style={selectStyle}
            id="password_type"
            value={this.props.type}
            onChange={this.props.onChangeType}
          >
            <option value={1}>
              {this.props.translate('type.special')}
            </option>
            <option value={2}>
              {this.props.translate('type.alphanum')}
            </option>
            <option value={3}>
              {this.props.translate('type.numeric')}
            </option>
          </select>
        </div>
      </div>
    );
  }
}

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
