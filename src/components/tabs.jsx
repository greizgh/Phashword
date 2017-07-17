import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {
  panelStyle,
  panelFormStyle,
  separatorStyle,
  tabHeaderStyle,
  tabButtonStyle,
} from './style.js';

class _Tabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }
  renderTitles() {
    return (
      <div style={tabHeaderStyle} className="Tabs__header">
        {this.props.children.map((child, index) => {
          const styles = [tabButtonStyle.base];
          if (this.state.selected === index) {
            styles.push(tabButtonStyle.selected);
          }
          let separator = <div style={separatorStyle}></div>;
          if (index === this.props.children.length - 1) {
            separator = null;
          }
          return (
            <div
              style={styles}
              onClick={() => this.setState({ selected: index })}
              key={index}
              className="Tabs__header__button"
            >
              {child.props.label}
              {separator}
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    return (
      <div style={panelStyle} className="Tabs">
        {this.renderTitles()}
        {this.props.children[this.state.selected]}
      </div>
    );
  }
}
_Tabs.propTypes = { selected: PropTypes.number };
_Tabs.defaultProps = { selected: 0 };

export const Tabs = Radium(_Tabs);

class _Pane extends React.PureComponent {
  render() {
    return (
      <div style={panelFormStyle} className="Tabs__panel">
        {this.props.children}
      </div>
    );
  }
}
_Pane.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export const Pane = Radium(_Pane);
