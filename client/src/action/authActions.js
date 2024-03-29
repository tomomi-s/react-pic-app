import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_ERRORS} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
	//Load User
	export const loadUser = () => async dispatch =>{

		if(localStorage.token){
			setAuthToken(localStorage.token)
		}
		try{
			const res = await axios.get('/api/auth');
			dispatch({
				type:USER_LOADED,
				payload: res.data
			})
		} catch(err){
			console.log(err)
			dispatch({type: AUTH_ERROR})
		}
	} 
	//Register User
	export const register = (formData) => async dispatch =>{
		const config = {
			header : {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/users', formData, config);

			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			})

			loadUser();
		} catch(err){
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			})
		}
	}
	//Login User
	export const login = (formData) => async dispatch =>{

		const config = {
			header : {
				'Content-Type': 'application/json'
			}
		}

		try {
			const res = await axios.post('/api/auth', formData, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			})

			loadUser();
		} catch(err){
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg
			})
		}
	}

	//Logout
	export const logout = () => {return({type: LOGOUT})}

	//Clear Errors
	export const clearErrors = () => {return({type: CLEAR_ERRORS})}
