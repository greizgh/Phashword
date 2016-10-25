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
    this.deleteProfile = this.deleteProfile.bind(this);
  }
  deleteProfile() {
    this.props.onDelete(this.props.profile.id);
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
            <input
              type="text"
              style={[inputStyle, textInputStyle]}
              key={'private'}
              id="private_key"
              value={this.props.profile.privateKey}
              onChange={this.onPrivateKeyChange}
            />
            <QRCode value={this.props.profile.privateKey} />
          </div>
          <div style={panelFormItemStyle}>
            <button key="delbtn" onClick={this.deleteProfile} style={btnStyle}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default Radium(ProfileItem);
