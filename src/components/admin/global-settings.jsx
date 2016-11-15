import React from 'react';
import { setToggleKey, toggleDefaultState } from '../../actions.js';
import { panelFormItemStyle, labelStyle, selectStyle, inputStyle } from '../style.js';

export default class GlobalSettings extends React.Component {
  constructor(props) {
    super(props);
    this.onToggleChange = this.onToggleChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
  }
  onKeyChange() {
    this.props.dispatch(toggleDefaultState());
  }
  onToggleChange(event) {
    this.props.dispatch(setToggleKey(event.target.value));
  }
  render() {
    return (
      <div>
        <div style={panelFormItemStyle}>
          <label htmlFor="state" style={labelStyle}>
            {this.props.translate('preferences.default_state')}
          </label>
          <input
            style={inputStyle}
            type="checkbox"
            id="state"
            onChange={this.onKeyChange}
            checked={this.props.defaultState}
          />
        </div>
        <div style={panelFormItemStyle}>
          <label style={labelStyle} htmlFor="toggle">
            {this.props.translate('preferences.toggle_key')}
          </label>
          <select
            style={selectStyle}
            key={'toggle'}
            id="toggle"
            value={this.props.toggleKey}
            onChange={this.onToggleChange}
          >
            <option key={'Escape'} value="Escape">
              {this.props.translate('preferences.key.escape')}
            </option>
            <option key={'F2'} value="F2">F2</option>
            <option key={'F3'} value="F3">F3</option>
          </select>
        </div>
      </div>
    );
  }
}

GlobalSettings.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  defaultState: React.PropTypes.bool,
  toggleKey: React.PropTypes.string,
  translate: React.PropTypes.func,
};

GlobalSettings.defaultProps = {
  translate: (id) => id,
};
