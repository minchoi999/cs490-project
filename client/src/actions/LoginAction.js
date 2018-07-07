import AppDispatcher from '../dispatcher/AppDispatcher.js';

const LoginAction = {

	showLogin: function() {
		AppDispatcher.dispatch( {
			actionType: 'showLogin',
		} );
	}
};

export default LoginAction;