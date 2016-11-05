import React from 'react';
import ProfileItem from './profileItem.jsx';
import { createProfile } from '../../actions/profile.js';
import { btnStyle } from '../style.js';

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
  }
  onCreate() {
    this.props.dispatch(createProfile());
  }
  render() {
    return (
      <div>
        {this.props.profiles.map((profile) => (
          <ProfileItem key={profile.id} profile={profile} dispatch={this.props.dispatch} />
        ))}
        <button onClick={this.onCreate} style={btnStyle} >Create new profile</button>
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  profiles: React.PropTypes.arrayOf(React.PropTypes.object),
  dispatch: React.PropTypes.func.isRequired,
};
