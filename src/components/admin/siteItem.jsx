import React from 'react';
import Radium from 'radium';

const style = {
  width: '400px',
  padding: '10px',
  backgroundColor: '#fcfcfc',
  boxShadow: '1px 1px 3px #ababab',
  transitionDuration: '250ms',
  transitionProperty: 'box-shadow',
  ':hover': {
    backgroundColor: '#fafafa',
    boxShadow: '1px 1px 3px #cdcdcd',
  },
};

const btnStyle = {
  backgroundColor: '#fbfbfb',
  border: '1px solid #b1b1b1',
  boxShadow: '0 0 0 0 transparent',
  font: 'caption',
  height: '24px',
  outline: '0 !important',
  padding: '0 8px 0',
  transitionDuration: '250ms',
  transitionProperty: 'box-shadow, border',
  float: 'right',
  ':hover': {
    backgroundColor: '#ebebeb',
    border: '1px solid #b1b1b1',
  },
  ':active': {
    backgroundColor: '#d4d4d4',
    border: '1px solid #858585',
  },
  ':focus': {
    borderColor: '#fff',
    boxShadow: '0 0 0 2px rgba(97, 181, 255, 0.75)',
  },
};

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
      <div style={style}>
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
