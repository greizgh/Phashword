import React from 'react';
import PropTypes from 'prop-types';
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

const qrStyle = {
  margin: '10px',
};

const privStyle = {
  height: '128px',
};

class ProfileItem extends React.PureComponent {
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
            <label htmlFor="name" style={labelStyle}>
              {this.props.translate('profile.name')}
            </label>
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
            <label htmlFor="color" style={labelStyle}>
              {this.props.translate('profile.color')}
            </label>
            <input
              style={inputStyle}
              type="color"
              id="color"
              value={this.props.profile.color}
              onChange={this.onColorChange}
            />
          </div>
          <div style={panelFormItemStyle}>
            <label htmlFor="length" style={labelStyle}>
              {this.props.translate('hash.length')}
            </label>
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
            <label style={labelStyle} htmlFor="type">
              {this.props.translate('hash.type')}
            </label>
            <select
              style={selectStyle}
              key={'type'}
              id="type"
              value={this.props.profile.type}
              onChange={this.onTypeChange}
            >
              <option value={1}>
                {this.props.translate('type.special')}
              </option>
              <option value={2}>
                {this.props.translate('type.alphanum')}
              </option>
              <option value={3}>
                {this.props.translate('type.numeric')}
              </option>
            </select>
          </div>
          <div style={panelFormItemStyle}>
            <label style={labelStyle} htmlFor="private_key">
              {this.props.translate('profile.private_key')}
            </label>
            <textarea
              style={[inputStyle, textInputStyle, privStyle]}
              key={'private'}
              id="private_key"
              value={this.props.profile.key}
              onChange={this.onPrivateKeyChange}
            />
            <div style={qrStyle}>
              <QRCode value={this.props.profile.key} />
            </div>
          </div>
          <div style={panelFormItemStyle}>
            <button key="delbtn" onClick={this.onDeleteProfile} style={btnStyle}>
              {this.props.translate('profile.delete')}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object,
  dispatch: PropTypes.func,
  translate: PropTypes.func,
};

ProfileItem.defaultProps = {
  translate: (id) => id,
};

export default Radium(ProfileItem);
