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
  close() {
    window.close();
  }
  render() {
    return (
      <div className="panel" style={popupStyle}>
        <Tabs>
          <Pane label="Profile">
            <QuickSettings />
          </Pane>
          <Pane label="Site">
            <SiteProfile />
          </Pane>
          <Pane label="Generate">
            <KeyGenerator />
          </Pane>
        </Tabs>
        <div className="panel-section panel-section-footer">
          <div className="panel-section-footer-button">Settings</div>
          <div className="panel-section-footer-separator"></div>
          <div className="panel-section-footer-button default" onClick={this.close}>Close</div>
        </div>
      </div>
    );
  }
}

render(<Popup />, document.getElementById('quick-settings'));
