import React from 'react';
import SiteAdmin from './siteAdmin.jsx';
import { Tabs, Pane } from '../popup/tabs.jsx';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: props.sites,
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
            <p>Profiles settings</p>
          </Pane>
          <Pane label="Sites">
            <SiteAdmin
              sites={this.state.sites}
              onDelete={this.props.onDelete}
            />
          </Pane>
        </Tabs>
      </div>
    );
  }
}

Settings.propTypes = {
  onReady: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func,
  sites: React.PropTypes.array,
};
