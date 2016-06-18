import React from 'react';
import {render} from 'react-dom';
import KeyGenerator from './popup/keygenerator.jsx';
import SiteProfile from './popup/siteprofile.jsx';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <SiteProfile/>
        <KeyGenerator/>
        <button>Settings</button>
      </div>
    );
  }
}

render(<Popup/>, document.getElementById('quick-settings'));
