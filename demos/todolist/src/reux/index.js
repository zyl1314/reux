import { observe } from './observer/index.js';
import {Provider, connect} from './helper.js';
class Store {
  constructor(options) {
    this._mutations = Object.create(null);
    this._actions = Object.create(null);

    let {
      state = {},
      mutations = {},
      actions = {}
    } = options;


    // 数据响应
    observe(state);
    this.state = state;
    // 注册mutions
    this.registerMutations(mutations);
    // 注册actions
    this.registerActions(actions);

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }


  registerMutations(mutations) {
    let _mutations = this._mutations;
    let state = this.state;

    for (let type in mutations) {
      _mutations[type] = function(payload) {
        mutations[type](state, payload);
      }
    }
  }

  registerActions(actions) {
    let _actions = this._actions;
    let store = this;

    for (let type in actions) {
      _actions[type] = function(payload) {
        actions[type](store, payload);
      }
    }
  }

  commit(type, payload) {
    let handle = this._mutations[type];
    handle && handle(payload);
  }

  dispatch(type, payload) {
    let handle = this._actions[type];
    handle && handle(payload);
  }
}

export {Provider, connect, Store};
export default Store;