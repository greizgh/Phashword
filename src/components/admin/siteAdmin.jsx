import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import SiteItem from './siteItem.jsx';
import { textInputStyle } from '../style.js';

const itemListStyle = {
  marginTop: '10px',
};

class SiteAdmin extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sites: props.sites,
      filter: '',
    };
    this.setFilter = this.setFilter.bind(this);
  }
  setFilter(event) {
    this.setState({ ...this.state, filter: event.target.value });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.filter}
          onChange={this.setFilter}
          style={textInputStyle}
        />
        <div style={itemListStyle}>
          {this.props.sites
            .filter((site) => site.id.startsWith(this.state.filter))
            .map((site) => (
              <SiteItem
                site={site}
                onDelete={this.props.onDelete}
                translate={this.props.translate}
              />
          ))}
        </div>
      </div>
    );
  }
}

SiteAdmin.propTypes = {
  sites: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  translate: PropTypes.func,
};

SiteAdmin.defaultProps = {
  translate: (id) => id,
};

export default Radium(SiteAdmin);
