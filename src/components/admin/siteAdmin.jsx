import React from 'react';
import SiteItem from './siteItem.jsx';

export default class SiteAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: props.sites,
      filter: '',
    }
    this.setFilter = this.setFilter.bind(this);
  }
  setFilter(event) {
    this.setState({...this.state, filter: event.target.value});
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.filter} onChange={this.setFilter} />
        <div>
          {this.props.sites
            .filter((site) => site.id.startsWith(this.state.filter))
            .map((site) => (
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
