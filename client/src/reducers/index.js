import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import postReducer from './postReducer';

export default combineReducers({
	auth: authReducer,
	alert: alertReducer,
	post: postReducer
});