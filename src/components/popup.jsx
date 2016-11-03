import React from 'react';
import KeyGenerator from './popup/keygenerator.jsx';
import SiteProfile from './popup/siteprofile.jsx';
import QuickSettings from './popup/quicksettings.jsx';
import { Tabs, Pane } from './popup/tabs.jsx';
import { popupFooterStyle, separatorStyle, popupFooterButtonStyle } from './style.js';
import { toggleSite, setTag, setProfile, setLength, setType } from '../actions/site.js';

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
    this.onToggleState = this.onToggleState.bind(this);
  }
  componentDidMount() {
    // Advertise popup is ready to receive current state
    this.props.dispatch({ type: 'POPUP_READY' });
  }
  onProfileChange(profile) {
    this.props.dispatch(setProfile(this.state.siteId, profile));
  }
  onTagChange(event) {
    this.props.dispatch(setTag(this.state.siteId, event.target.value));
  }
  onLengthChange(event) {
    this.props.dispatch(setLength(this.state.siteId, event.target.value));
  }
  onTypeChange(event) {
    this.props.dispatch(setType(this.state.siteId, event.target.value));
  }
  onToggleState() {
    this.props.dispatch(toggleSite(this.state.siteId));
  }
  requestPass(event) {
    const request = {
      passwordType: this.state.type,
      passwordLength: this.state.length,
      tag: this.state.tag,
      masterKey: event.target.value,
      profile: this.state.selectedProfile,
    };
    this.props.onPassword(request, (hash) => {
      this.setState({ ...this.state, password: hash });
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
              onToggle={this.onToggleState}
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
            <KeyGenerator requestPassword={this.requestPass} password={this.state.password} />
          </Pane>
        </Tabs>
        <footer style={popupFooterStyle}>
          <div style={popupFooterButtonStyle} onClick={this.props.onSettings}>Settings</div>
          <div style={separatorStyle} />
          <div style={popupFooterButtonStyle} onClick={this.props.onClose}>Close</div>
        </footer>
      </div>
    );
  }
}

Popup.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  onPassword: React.PropTypes.func,
  onSettings: React.PropTypes.func,
  onClose: React.PropTypes.func,
};
