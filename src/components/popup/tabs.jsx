import React from 'react';

export class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.selected };
  }
  renderTitles() {
    return (
      <div className="panel-section panel-section-tabs">
        {this.props.children.map((child, index) => {
          let activeClass = 'panel-section-tabs-button';
          if (this.state.selected === index) {
            activeClass += ' selected';
          }
          let separator = <div className="panel-section-tabs-separator"></div>;
          if (index === this.props.children.length) {
            separator = '';
          }
          return (
            <div
              className={activeClass}
              onClick={() => this.setState({ selected: index })}
              key={index}
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
      <div className="panel">
        {this.renderTitles()}
        {this.props.children[this.state.selected]}
      </div>
    );
  }
}
Tabs.propTypes = { selected: React.PropTypes.number };
Tabs.defaultProps = { selected: 0 };

export class Pane extends React.Component {
  render() {
    return (
      <div className="panel-section panel-section-formElements">
        {this.props.children}
      </div>
    );
  }
}
Pane.propTypes = {
  label: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,
};
