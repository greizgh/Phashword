import React from 'react';
import Radium from 'radium';
import { labelStyle, inputStyle, textInputStyle, selectStyle } from '../style.js';

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
      <div>
        <label htmlFor="name" style={labelStyle}>Name</label>
        <input
          style={[inputStyle, textInputStyle]}
          type="text"
          id="name"
          key={'name'}
          value={this.props.profile.name}
          onChange={this.onNameChange}
        />
        <label htmlFor="color" style={labelStyle}>Color</label>
        <input
          type="color"
          id="color"
          value={this.props.profile.color}
          onChange={this.onColorChange}
        />
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
        <label style={labelStyle} htmlFor="private_key">Private key</label>
        <input
          type="text"
          style={[inputStyle, textInputStyle]}
          key={'private'}
          id="private_key"
          value={this.props.profile.privateKey}
          onChange={this.onPrivateKeyChange}
        />
        <button key="delbtn" onClick={this.deleteProfile}>Delete</button>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default Radium(ProfileItem);
