import React, { Component } from 'react';
import { connect } from './reux';

class List extends Component {
  render() {
    const { list } = this.props;
    return (
      <ul>
        {
          list.map((i, idx) => <li key={idx}>{i.count}</li>)
        }
      </ul>
    )
  }    
}

export default connect((state) => {
  return {
    list: state.list
  }
})(List);
