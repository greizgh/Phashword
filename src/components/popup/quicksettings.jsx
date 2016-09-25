import React from 'react';

export default class QuickState extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label htmlFor="profile">Profile</label>
          <select id="profile" value={this.props.currentProfile} onChange={this.props.onProfileChange}>
            {this.props.profiles.map((profile) => {
              return (<option value={profile.id} key={profile.id}>{profile.name}</option>);
             })}
          </select>
          <span className="color-sample" id="color"></span>
        </div>
        <div className="panel-formElements-item">
          <button className="default" id="state" onClick={this.props.onToggle}>State</button>
        </div>
      </div>
    );
  }
}

QuickState.propTypes = {
  currentProfile: React.PropTypes.number.isRequired,
  profiles: React.PropTypes.arrayOf(React.PropTypes.object),
  enabled: React.PropTypes.bool,
  onToggle: React.PropTypes.func,
  onProfileChange: React.PropTypes.func,
};
