import React from 'react';
import SiteItem from './siteItem.jsx';

export default class SiteAdmin extends React.Component {
  render() {
    return (
      <div>
        <div>
          {this.props.sites.map((site) => (
            <SiteItem site={site} onDelete={this.props.onDelete} />
          ))}
        </div>
      </div>
    );
  }
}

SiteAdmin.propTypes = {
  sites: React.PropTypes.arrayOf(React.PropTypes.object),
  onDelete: React.PropTypes.func,
};
