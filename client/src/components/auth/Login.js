import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import { login, clearErrors } from '../../action/authActions';
import { setAlert } from '../../action/alertActions';

const Login = ({props, login, clearErrors, error, isAuthenticated, setAlert}) => {
	useEffect(() => {
		if(isAuthenticated){
			props.history.push('/');
		}
		if(error === "Invalid Credentials"){
			setAlert(error);
			clearErrors()
		}
		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		email:'',
		password: '',
	})

	const { email, password } = user;

	const onChange = e => setUser({...user, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault();
		
		if(email === '' || password === ''){
			setAlert('Please fill in all fields');
		}else{
			login({
				email,
				password
			})
		}
	}
	return (
		<div className="row">
			<div className="col m12 l6 offset-l3">
				<h3>
					Account <span className="teal-text text-lighten-1">Login</span>
				</h3>
				<form>
					
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" value={email} onChange={onChange} required/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={password} onChange={onChange} required/>
					</div>
					<div className="input-field right-align">
						<button onClick={onSubmit} className="btn-large waves-effect waves-light" type="submit" name="action">
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
const mapStateToProps = (state, ownProps) => ({
	error: state.auth.error,
	isAuthenticated: state.auth.isAuthenticated,
	props: ownProps
})


export default connect(mapStateToProps, {login, clearErrors, setAlert})(Login);
