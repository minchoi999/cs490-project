import AppDispatcher from "../dispatcher/AppDispatcher.js";
import { EventEmitter } from "events";

const CHANGE_EVENT = "change";

let _showLogin = false;

class LoginStore extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getShowLogin() {
    return _showLogin;
  }
}

const _loginStore = new LoginStore();

export default _loginStore;

_loginStore.dispatchToken = AppDispatcher.register(action => {
  switch (action.actionType) {
    case "toggleShowLogin":
      _showLogin = !_showLogin;
      _loginStore.emitChange();
      break;

    default:
      break;
  }

  return true;
});
