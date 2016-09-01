import React from 'react';

export default class SiteProfile extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        <div className="panel-formElements-item">
          <label htmlFor="tag">Tag</label>
          <input type="text" name="tag" id="tag" size="20" value={this.props.tag} />
        </div>
        <div className="panel-formElements-item">
          <label htmlFor="password_length">Length</label>
          <input type="number" id="password_length" min="1" value={this.props.length} />
        </div>
        <div className="panel-formElements-item">
          <label htmlFor="password_type">Type</label>
          <select name="password_type" id="password_type" value={this.props.type}>
            <option value="1">Alphanumeric and special characters</option>
            <option value="2">Alphanumeric</option>
            <option value="3">Numeric</option>
          </select>
        </div>
      </div>
    );
  }
}

SiteProfile.propTypes = {
  tag: React.PropTypes.string,
  length: React.PropTypes.number,
  type: React.PropTypes.number,
};
