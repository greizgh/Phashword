export const siteItemStyle = {
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

export const btnStyle = {
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

export const textInputStyle = {
  backgroundColor: '#fff',
  border: '1px solid #b1b1b1',
  boxShadow: '0 0 0 0 rgba(97, 181, 255, 0)',
  font: 'caption',
  padding: '0 6px 0',
  transitionDuration: '250ms',
  transitionProperty: 'box-shadow',
  height: '24px',
  ':hover': {
    border: '1px solid #858585',
  },
  ':focus': {
    borderColor: '#0996f8',
    boxShadow: '0 0 0 2px rgba(97, 181, 255, 0.75)',
  },
};
