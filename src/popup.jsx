import React from 'react';
import { render } from 'react-dom';
import KeyGenerator from './popup/keygenerator.jsx';
import SiteProfile from './popup/siteprofile.jsx';
import QuickSettings from './popup/quicksettings.jsx';
import { Tabs, Pane } from './popup/tabs.jsx';

const popupStyle = {
  width: '400px',
};

class Popup extends React.Component {
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
    this.openSettings = this.openSettings.bind(this);
  }
  componentDidMount() {
    // Advertise popup is ready to receive current state
    this.props.dispatch({ type: 'POPUP_READY' });
  }
  close() {
    window.close();
  }
  openSettings() {
    this.props.dispatch({ type: 'OPEN_SETTINGS' });
  }
  // Handle state change
  toggleState() {
    chrome.runtime.sendMessage({ type: 'TOGGLE_SITE_STATE' });
  }
  // Handle profile change
  updateSiteProfile(profile) {
    chrome.runtime.sendMessage({ type: 'SET_SITE_PROFILE ', siteId: this.state.siteId, profile });
  }
  requestPass(masterKey) {
    // TODO
    chrome.runtime.sendMessage({
      type: 'REQUEST_PASS',
      privateKey: this.state.profiles[this.state.selectedProfile].privateKey,
      tag: this.state.tag,
      masterKey,
      passwordLength: this.state.length,
      passwordType: this.state.type,
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
              enabled={this.enabled}
              onToggle={this.toggleState}
              onProfileChange={this.updateSiteProfile}
            />
          </Pane>
          <Pane label="Site">
            <SiteProfile length={this.state.length} tag={this.state.tag} type={this.state.type} />
          </Pane>
          <Pane label="Generate">
            <KeyGenerator requestPassword={this.requestPass} />
          </Pane>
        </Tabs>
        <div className="panel-section panel-section-footer">
          <div className="panel-section-footer-button" onClick={this.openSettings}>Settings</div>
          <div className="panel-section-footer-separator"></div>
          <div className="panel-section-footer-button default" onClick={this.close}>Close</div>
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  dispatch: React.PropTypes.func,
}

function dispatch(action) {
  chrome.runtime.sendMessage(action);
}

const popup = render(<Popup dispatch={dispatch}/>, document.getElementById('quick-settings'));

chrome.runtime.onMessage.addListener((message) => {
  console.log('Popup received ' + message.type);
  if (message.type === '@POPUP_STATE') {
    console.log('set state');
    popup.setState(message.state);
  }
});
