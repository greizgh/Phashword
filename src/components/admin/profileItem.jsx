import React from 'react';
import Radium from 'radium';
import QRCode from 'qrcode.react';
import {
  btnStyle,
  labelStyle,
  inputStyle,
  textInputStyle,
  selectStyle,
  panelFormItemStyle,
} from '../style.js';
import {
  deleteProfile,
  setProfileName,
  setProfileType,
  setProfileColor,
  setProfileLength,
  setProfileKey,
} from '../../actions/profile';

const itemStyle = {
  padding: '10px',
  boxShadow: '1px 1px 3px #ababab',
  font: 'caption',
};

const headerStyle = {
  padding: '10px',
  fontWeight: 'bold',
};

class ProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteProfile = this.onDeleteProfile.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.onLengthChange = this.onLengthChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onPrivateKeyChange = this.onPrivateKeyChange.bind(this);
  }
  onDeleteProfile() {
    this.props.dispatch(deleteProfile(this.props.profile.id));
  }
  onNameChange(event) {
    this.props.dispatch(setProfileName(this.props.profile.id, event.target.value));
  }
  onColorChange(event) {
    this.props.dispatch(setProfileColor(this.props.profile.id, event.target.value));
  }
  onLengthChange(event) {
    this.props.dispatch(setProfileLength(this.props.profile.id, event.target.value));
  }
  onTypeChange(event) {
    this.props.dispatch(setProfileType(this.props.profile.id, event.target.value));
  }
  onPrivateKeyChange(event) {
    this.props.dispatch(setProfileKey(this.props.profile.id, event.target.value));
  }
  render() {
    return (
      <div style={itemStyle}>
        <div key={'header'} style={headerStyle}>
          {this.props.profile.name}
        </div>
        <div>
          <div style={panelFormItemStyle}>
            <label htmlFor="name" style={labelStyle}>Name</label>
            <input
              style={[inputStyle, textInputStyle]}
              type="text"
              id="name"
              key={'name'}
              value={this.props.profile.name}
              onChange={this.onNameChange}
            />
          </div>
          <div style={panelFormItemStyle}>
            <label htmlFor="color" style={labelStyle}>Color</label>
            <input
              style={inputStyle}
              type="color"
              id="color"
              value={this.props.profile.color}
              onChange={this.onColorChange}
            />
          </div>
          <div style={panelFormItemStyle}>
            <label htmlFor="length" style={labelStyle}>Length</label>
            <input
              type="number"
              style={[inputStyle, textInputStyle]}
              id="length"
              key={'length'}
              min="1"
              value={this.props.profile.length}
              onChange={this.onLengthChange}
            />
          </div>
          <div style={panelFormItemStyle}>
            <label style={labelStyle} htmlFor="type">Type</label>
            <select
              style={selectStyle}
              key={'type'}
              id="type"
              value={this.props.profile.type}
              onChange={this.onTypeChange}
            >
              <option key={1} value="1">Alphanumeric and special characters</option>
              <option key={2} value="2">Alphanumeric</option>
              <option key={3} value="3">Numeric</option>
            </select>
          </div>
          <div style={panelFormItemStyle}>
            <label style={labelStyle} htmlFor="private_key">Private key</label>
            <textarea
              style={[inputStyle, textInputStyle]}
              key={'private'}
              id="private_key"
              value={this.props.profile.privateKey}
              onChange={this.onPrivateKeyChange}
            />
            <QRCode value={this.props.profile.privateKey} />
          </div>
          <div style={panelFormItemStyle}>
            <button key="delbtn" onClick={this.onDeleteProfile} style={btnStyle}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default Radium(ProfileItem);
