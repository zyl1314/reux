/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
import { remove } from '../util.js';

let uid = 0;

export default class Dep {

  constructor () {
    this.id = uid++;
    this.subs = []
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addSub (sub) {
    this.subs.push(sub);
  }

  removeSub (sub) {
    remove(this.subs, sub)
  }

  notify () {
    // stablize the subscriber list first
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null
const targetStack = []

export function pushTarget (_target) {
  if (Dep.target) targetStack.push(Dep.target)
  Dep.target = _target
}

export function popTarget () {
  Dep.target = targetStack.pop()
}
