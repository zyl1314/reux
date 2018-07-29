# reux 
> 骚操作！在react中使用vuex

## Usage
- createStore  
```js
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
```
- Provider  
```js
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
document.getElementById('root'));
```
- connect
```js
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
```

## Examples
```
$ cd demos/todolist
$ npm install
$ npm start
```

## Todo
- [ ] 支持Module

## License

[MIT](http://opensource.org/licenses/MIT)