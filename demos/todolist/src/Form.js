import React, { Component } from 'react';
import { connect } from './reux';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }

  change(e) {
    this.setState({
      value: e.target.value
    })
  }

  submit() {
    const { dispatch } = this.props;
    dispatch('add', {count: this.state.value})   
 }

  render() {
    return (
      <p>
        <input value={this.state.value} onChange={this.change} />
        <button onClick={this.submit}>+</button>
      </p>
    )
  }    
}

export default connect()(Form);
