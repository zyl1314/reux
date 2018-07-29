import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pushTarget, popTarget } from './observer/dep.js';
class Provider extends Component {
  getChildContext() {
    return {store: this.props.store};
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
Provider.childContextTypes = {
  store: PropTypes.object
};


const connect = (mapStateToProps = () => {}) => {
  return (WrappedComponent) => {
    const Wrapper = class extends Component {
      constructor(props) {
        super(props);
        this.deps = [];
        this.depsId = new Set();
      }

      componentWillMount() {
        pushTarget(this);
      }

      componentDidMount() {
        popTarget(this);
      }

      componentWillUnmount() {
        this.clear();
      }

      clear() {
        this.depsId.clear();
        this.deps = [];
        this.deps.forEach(dep => dep.removeSub(this));
      }

      update() {
        // 暴力清空
        this.clear();
        pushTarget(this);
        this.forceUpdate(() => {
          popTarget(this);
        })
      }

      addDep(dep) {
        const id = dep.id;
        if (!this.depsId.has(id)) {
          this.depsId.add(id);
          this.deps.push(dep);
          dep.addSub(this);
        }
      }

      render() {
        const store = this.context.store;
        const props = Object.assign({}, this.props, mapStateToProps(store.state, this.props), {dispatch: store.dispatch, commit: store.commit});
        return <WrappedComponent {...props} />
      }
    }
    Wrapper.contextTypes = {
      store: PropTypes.object
    };
    return Wrapper;
  }
}

export {Provider, connect};