import React from 'react';
import Radium from 'radium';
import { siteItemStyle, btnStyle } from '../style.js';

class SiteItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteSite = this.deleteSite.bind(this);
  }
  deleteSite() {
    this.props.onDelete(this.props.site.id);
  }
  render() {
    return (
      <div style={siteItemStyle}>
        {this.props.site.id} - {this.props.site.tag} - {this.props.site.length}
        <button key="delbtn" onClick={this.deleteSite} style={btnStyle}>Delete</button>
      </div>
    );
  }
}

SiteItem.propTypes = {
  site: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default Radium(SiteItem);
