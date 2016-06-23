import React from 'react';
import {render} from 'react-dom';
import KeyGenerator from './popup/keygenerator.jsx';
import SiteProfile from './popup/siteprofile.jsx';

const popupStyle = {
    width: '300px',
};

class Popup extends React.Component {
  render() {
    return (
      <div className="popup" style={popupStyle}>
        <SiteProfile/>
        <KeyGenerator/>
        <button>Settings</button>
      </div>
    );
  }
}

render(<Popup/>, document.getElementById('quick-settings'));
