import AppDispatcher from '../dispatcher/AppDispatcher.js';

const LoginAction = {

	toggleShowLogin: function() {
		AppDispatcher.dispatch( {
			actionType: 'toggleShowLogin',
		} );
	}
};

export default LoginAction;