import React from 'react';
import SiteAdmin from './siteAdmin.jsx';
import ProfileSettings from './profileSettings.jsx';
import GlobalSettings from './global-settings.jsx';
import { Tabs, Pane } from '../popup/tabs.jsx';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: props.sites || [],
      profiles: props.profiles || [],
      toggleKey: 'Escape',
      defaultState: false,
    };
  }
  componentDidMount() {
    this.props.dispatch({ type: 'SETTINGS_READY' });
  }
  render() {
    return (
      <div>
        <Tabs>
          <Pane label="Options">
            <GlobalSettings
              dispatch={this.props.dispatch}
              defaultState={this.state.defaultState}
              toggleKey={this.state.toggleKey}
            />
          </Pane>
          <Pane label="Profiles">
            <ProfileSettings
              profiles={this.state.profiles}
              dispatch={this.props.dispatch}
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
  onSiteDelete: React.PropTypes.func,
  dispatch: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array,
  profiles: React.PropTypes.array,
  defaultState: React.PropTypes.bool,
  toggleKey: React.PropTypes.string,
};
