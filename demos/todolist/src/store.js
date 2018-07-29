import Reux from './reux';

const store = new Reux({
  state: {
    list: [{count: 1}]
  },
  mutations: {
    add (state, payload) {
      state.list.push(payload)
    }
  },
  actions: {
    add ({commit}, payload) {
      setTimeout(function() {
        commit('add', payload);
      }, 1000);
    }
  }
})

export default store;

window.store = store;