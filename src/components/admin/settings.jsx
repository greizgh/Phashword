import React from 'react';
import SiteAdmin from './siteAdmin.jsx';
import ProfileSettings from './profileSettings.jsx';
import { Tabs, Pane } from '../popup/tabs.jsx';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: props.sites || [],
      profiles: props.profiles || [],
    };
  }
  componentDidMount() {
    this.props.onReady();
  }
  render() {
    return (
      <div>
        <Tabs>
          <Pane label="Options">
            <p>Global options</p>
          </Pane>
          <Pane label="Profiles">
            <ProfileSettings
              profiles={this.state.profiles}
              onDelete={this.props.onProfileDelete}
            />
          </Pane>
          <Pane label="Sites">
            <SiteAdmin
              sites={this.state.sites}
              onDelete={this.props.onSiteDelete}
            />
          </Pane>
        </Tabs>
      </div>
    );
  }
}

Settings.propTypes = {
  onReady: React.PropTypes.func.isRequired,
  onSiteDelete: React.PropTypes.func,
  onProfileDelete: React.PropTypes.func,
  sites: React.PropTypes.array,
  profiles: React.PropTypes.array,
};
