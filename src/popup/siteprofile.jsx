import React from 'react';

export default class SiteProfile extends React.Component {
  render() {
    return (
      <div>
        <label data-l10n-id="profile" for="profile">Profile</label>
        <select id="profile" name="profile"></select>
        <span class="color-sample" id="color"></span>
        <button class="state fill" id="state">State</button>
        <label data-l10n-id="website_tag" for="tag">Tag</label>
        <input type="text" name="tag" id="tag" size="20"/>
        <label data-l10n-id="password_length" for="password_length">Length</label>
        <input type="number" name="password_length" id="password_length" min="1" value="12"/>
        <label data-l10n-id="password_type" for="password_type">Type</label>
        <select name="password_type" id="password_type">
          <option value="1" data-l10n-id="alphaspec">Alphanumeric and special characters</option>
          <option value="2" data-l10n-id="alpha">Alphanumeric</option>
          <option value="3" data-l10n-id="num">Numeric</option>
        </select>
      </div>
    );
  }
}
