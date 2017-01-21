import React from 'react';
import Radium from 'radium';
import {
  panelFormStyle,
  panelFormItemStyle,
  panelLastFormItemStyle,
  labelStyle,
  inputStyle,
  selectStyle,
} from '../style.js';

const borderedDivStyle = Object.assign({}, panelFormItemStyle);

class QuickState extends React.Component {
  getColorStyle() {
    const profile = this.props.profiles
      .filter((p) => p.id === this.props.currentProfile)[0];
    if (profile) {
      borderedDivStyle.borderBottom = `5px solid ${profile.color}`;
    }
    return borderedDivStyle;
  }

  render() {
    return (
      <div style={panelFormStyle}>
        <div style={this.getColorStyle()}>
          <label htmlFor="profile" style={labelStyle}>
            {this.props.translate('profile')}
          </label>
          <select
            style={selectStyle}
            id="profile"
            value={this.props.currentProfile}
            onChange={this.props.onProfileChange}
          >
            {this.props.profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>{profile.name}</option>
            ))}
          </select>
        </div>
        <div style={[panelFormItemStyle, panelLastFormItemStyle]}>
          <label htmlFor="state" style={labelStyle}>
            {this.props.translate('active')}
          </label>
          <input
            style={inputStyle}
            type="checkbox"
            className="default"
            id="state"
            onChange={this.props.onToggle}
            checked={this.props.enabled}
          />
        </div>
      </div>
    );
  }
}

QuickState.propTypes = {
  currentProfile: React.PropTypes.string.isRequired,
  profiles: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  enabled: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  onProfileChange: React.PropTypes.func,
  translate: React.PropTypes.func,
};

QuickState.defaultProps = {
  translate: (id) => id,
};

export default Radium(QuickState);
