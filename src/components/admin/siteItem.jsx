import React from 'react';
import PropTypes from 'prop-types';
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
        <button
          key={'delbtn' + this.props.site.id}
          onClick={this.deleteSite}
          style={[btnStyle, shrink]}
        >
          {this.props.translate('site.delete')}
        </button>
      </div>
    );
  }
}

SiteItem.propTypes = {
  site: PropTypes.object,
  onDelete: PropTypes.func,
  translate: PropTypes.func,
};

SiteItem.defaultProps = {
  translate: (id) => id,
};

export default Radium(SiteItem);
