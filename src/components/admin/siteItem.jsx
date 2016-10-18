import React from 'react';
import Radium from 'radium';
import { siteItemStyle, btnStyle } from '../style.js';

const shrink = { flexShrink: '0' };
const grow = { flexGrow: '1' };

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
        <span style={grow}>
          {this.props.site.id} - {this.props.site.tag} - {this.props.site.length}
        </span>
        <button key="delbtn" onClick={this.deleteSite} style={[btnStyle, shrink]}>Delete</button>
      </div>
    );
  }
}

SiteItem.propTypes = {
  site: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};

export default Radium(SiteItem);
