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
      selectedProfile: '',
      profiles: [],
      siteId: '',
      enabled: true,
      tag: '',
      length: 12,
      type: 1,
      password: '',
    };
    this.requestPass = this.requestPass.bind(this);
    this.onProfileChange = this.onProfileChange.bind(this);
    this.onTagChange = this.onTagChange.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }
  componentDidMount() {
    // Advertise popup is ready to receive current state
    this.props.onReady();
  }
  onProfileChange(profile) {
    this.props.onProfileChange(this.state.siteId, profile);
  }
  onTagChange(event) {
    this.props.onTagChange(this.state.siteId, event.target.value);
  }
  onLengthChange(event) {
    this.props.onLengthChange(this.state.siteId, event.target.value);
  }
  onTypeChange(event) {
    this.props.onTypeChange(this.state.siteId, event.target.value);
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
              onProfileChange={this.onProfileChange}
            />
          </Pane>
          <Pane label="Site">
            <SiteProfile
              length={this.state.length}
              tag={this.state.tag}
              type={this.state.type}
              onChangeType={this.onTypeChange}
              onChangeTag={this.onTagChange}
              onChangeLength={this.onLengthChange}
            />
          </Pane>
          <Pane label="Generate">
            <KeyGenerator requestPassword={this.props.onPassword} password={this.state.password} />
          </Pane>
        </Tabs>
        <footer>
          <div className="panel-section-footer-button" onClick={this.props.onSettings}>Settings</div>
          <div className="separator"></div>
          <div className="panel-section-footer-button default" onClick={this.props.onClose}>Close</div>
        </footer>
      </div>
    );
  }
}

Popup.propTypes = {
  onReady: React.PropTypes.func,
  onPassword: React.PropTypes.func,
  onToggleState: React.PropTypes.func,
  onProfileChange: React.PropTypes.func,
  onSettings: React.PropTypes.func,
  onClose: React.PropTypes.func,
  onTypeChange: React.PropTypes.func,
  onLengthChange: React.PropTypes.func,
  onTagChange: React.PropTypes.func,
}
