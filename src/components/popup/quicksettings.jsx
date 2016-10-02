import React from 'react';

export default class QuickState extends React.Component {
  getColorStyle() {
    const style = {};
    if (this.props.profiles[this.props.currentProfile]) {
      style.borderBottom = `5px solid ${this.props.profiles[this.props.currentProfile].color}`;
    }
    return style;
  }

  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item" style={this.getColorStyle()}>
          <label htmlFor="profile">Profile</label>
          <select
            id="profile"
            value={this.props.currentProfile}
            onChange={this.props.onProfileChange}
          >
            {this.props.profiles.map((profile) => (
              <option value={profile.id} key={profile.id}>{profile.name}</option>
            ))}
          </select>
        </div>
        <div className="panel-formElements-item">
          <label htmlFor="state">Active</label>
          <input type="checkbox" className="default" id="state" onClick={this.props.onToggle} checked={this.props.enabled}/>
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
};
