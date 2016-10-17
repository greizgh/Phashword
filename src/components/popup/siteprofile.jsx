import React from 'react';
import Radium from 'radium';
import { panelFormStyle, panelFormItemStyle, labelStyle, inputStyle, textInputStyle } from '../style.js';

class SiteProfile extends React.Component {
  render() {
    return (
      <div style={panelFormStyle}>
        <div style={panelFormItemStyle}>
          <label htmlFor="tag" style={labelStyle}>Tag</label>
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
          <label style={labelStyle} htmlFor="password_length">Length</label>
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
        <div style={panelFormItemStyle}>
          <label style={labelStyle} htmlFor="password_type">Type</label>
          <select
            style={inputStyle}
            id="password_type"
            value={this.props.type}
            onChange={this.props.onChangeType}
          >
            <option value="1">Alphanumeric and special characters</option>
            <option value="2">Alphanumeric</option>
            <option value="3">Numeric</option>
          </select>
        </div>
      </div>
    );
  }
}

SiteProfile.propTypes = {
  tag: React.PropTypes.string,
  length: React.PropTypes.number,
  type: React.PropTypes.number,
  onChangeType: React.PropTypes.func,
  onChangeLength: React.PropTypes.func,
  onChangeTag: React.PropTypes.func,
};

export default Radium(SiteProfile);
