import React from 'react';

export default class KeyGenerator extends React.Component {
  render() {
    return (
      <div>
        <label>Master key</label>
        <input type="password"/>
        <label>Password</label>
        <input type="text" readonly/>
        <button>Copy</button>
      </div>
    );
  }
}
