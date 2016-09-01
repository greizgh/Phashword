import React from 'react';
import KeyGenerator from './popup/keygenerator.jsx';
import SiteProfile from './popup/siteprofile.jsx';
import QuickSettings from './popup/quicksettings.jsx';
import { Tabs, Pane } from './popup/tabs.jsx';

const popupStyle = {
  width: '400px',
};

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProfile: 0,
      profiles: [],
      siteId: '',
      enabled: true,
      tag: '',
      length: 12,
      type: 1,
      password: '',
    };
    this.requestPass = this.requestPass.bind(this);
  }
  componentDidMount() {
    // Advertise popup is ready to receive current state
    this.props.dispatch({ type: 'POPUP_READY' });
  }
  // Handle profile change
  updateSiteProfile(profile) {
    chrome.runtime.sendMessage({ type: 'SET_SITE_PROFILE ', siteId: this.state.siteId, profile });
  }
  requestPass(event) {
    chrome.runtime.sendMessage({
      type: 'REQUEST_PASS',
      privateKey: this.state.profiles[this.state.selectedProfile].privateKey,
      tag: this.state.tag,
      masterKey: event.target.value,
      passwordLength: this.state.length,
      passwordType: this.state.type,
    }, (response) => {
      this.setState({ ... this.state, password: response.hash });
    });
  }
  render() {
    return (
      <div className="panel" style={popupStyle}>
        <Tabs>
          <Pane label="Profile">
            <QuickSettings
              profiles={this.state.profiles}
              currentProfile={this.state.selectedProfile}
              enabled={this.state.enabled}
              onToggle={this.props.onToggleState}
              onProfileChange={this.props.updateSiteProfile}
            />
          </Pane>
          <Pane label="Site">
            <SiteProfile length={this.state.length} tag={this.state.tag} type={this.state.type} />
          </Pane>
          <Pane label="Generate">
            <KeyGenerator requestPassword={this.requestPass} password={this.state.password} />
          </Pane>
        </Tabs>
        <div className="panel-section panel-section-footer">
          <div className="panel-section-footer-button" onClick={this.props.onSettings}>Settings</div>
          <div className="panel-section-footer-separator"></div>
          <div className="panel-section-footer-button default" onClick={this.props.onClose}>Close</div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  dispatch: React.PropTypes.func,
  onToggleState: React.PropTypes.func,
  onProfileChange: React.PropTypes.func,
  onSettings: React.PropTypes.func,
  onClose: React.PropTypes.func,
}
