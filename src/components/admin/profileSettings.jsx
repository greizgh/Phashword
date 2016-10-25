import React from 'react';
import ProfileItem from './profileItem.jsx';

export default class ProfileSettings extends React.Component {
  render() {
    return (
      <div>
        {this.props.profiles.map((profile) => (
          <ProfileItem profile={profile} onDelete={this.props.onDelete} />
        ))}
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  profiles: React.PropTypes.arrayOf(React.PropTypes.object),
  onDelete: React.PropTypes.func,
};
