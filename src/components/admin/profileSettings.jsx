import React from 'react';
import ProfileItem from './profileItem.jsx';

export default class ProfileSettings extends React.Component {
  render() {
    return (
      <div>
        {this.props.profiles.map((profile) => (
          <ProfileItem key={profile.id} profile={profile} dispatch={this.props.dispatch} />
        ))}
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  profiles: React.PropTypes.arrayOf(React.PropTypes.object),
  dispatch: React.PropTypes.func.isRequired,
};
