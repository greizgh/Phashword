export const siteItemStyle = {
  padding: '10px',
  backgroundColor: '#fcfcfc',
  boxShadow: '1px 1px 3px #ababab',
  transitionDuration: '250ms',
  transitionProperty: 'box-shadow',
  ':hover': {
    backgroundColor: '#fafafa',
    boxShadow: '1px 1px 3px #cdcdcd',
  },
  font: 'caption',
  display: 'flex',
  flexDirection: 'row',
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

export const selectStyle = {
  backgroundColor: '#fbfbfb',
  border: '1px solid #b1b1b1',
  boxShadow: '0 0 0 0 transparent',
  font: 'caption',
  height: '24px',
  outline: '0',
  padding: '0 8px 0',
  MozAppearance: 'none',
  MozPaddingEnd: '24px',
  flexGrow: '1',
  transitionDuration: '250ms',
  transitionProperty: 'box-shadow, border',
  backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBkPSJNOCwxMkwzLDcsNCw2bDQsNCw0LTQsMSwxWiIgZmlsbD0iIzZBNkE2QSIgLz4KPC9zdmc+Cg==)',
  backgroundPosition: 'calc(100% - 4px) center',
  backgroundRepeat: 'no-repeat',
  textOverflow: 'ellipsis',
  ':hover': {
    backgroundColor: '#ebebeb',
    border: '1px solid #b1b1b1',
  },
  ':focus': {
    borderColor: '#fff',
    boxShadow: '0 0 0 2px rgba(97, 181, 255, 0.75)',
  },
};

export const panelStyle = {
  color: '#222426',
  cursor: 'default',
  font: 'caption',
  padding: '0px',
};

export const panelFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
};

export const panelFormItemStyle = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '12px',
};

export const panelLastFormItemStyle = {
  marginBottom: '0',
};

export const labelStyle = {
  flexShrink: '0',
  flexBasis: '80px',
  marginRight: '6px',
  textAlign: 'right',
};

export const inputStyle = {
  flexGrow: '1',
};

export const separatorStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  width: '1px',
  zIndex: 99,
};

export const tabHeaderStyle = {
  color: '#1a1a1a',
  display: 'flex',
  flexDirection: 'row',
  height: '41px',
  marginBottom: '-1px',
  padding: '0',
};

export const tabButtonStyle = {
  base: {
    flex: '1 1 auto',
    margin: '0 -1px',
    padding: '12px',
    textAlign: 'center',
    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.06)',
    },
  },
  selected: {
    boxShadow: '0 -1px 0 #0670cc inset, 0 -4px 0 #0996f8 inset',
    color: '#0996f8',
    ':hover': {
      color: '#0670cc',
    },
  },
};

export const popupFooterStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.06)',
  borderTop: '1px solid rgba(0, 0, 0, 0.15)',
  color: '#1a1a1a',
  display: 'flex',
  flexDirection: 'row',
  height: '41px',
  marginTop: '-1px',
  padding: 0,
};

export const popupFooterButtonStyle = {
  font: 'caption',
  cursor: 'default',
  flex: '1 1 auto',
  margin: '0 -1px',
  padding: '12px',
  textAlign: 'center',
  ':hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
};
