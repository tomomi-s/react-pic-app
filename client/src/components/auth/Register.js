import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { register, clearErrors } from '../../action/authActions';
import { setAlert } from '../../action/alertActions';

const Register = ({props, register, error, clearErrors, isAuthenticated, setAlert}) => {

	useEffect(() => {
		if(isAuthenticated){
			props.history.push('/');
		}
		if(error === "User already exists"){
			setAlert(error);
			clearErrors()
		}
		//eslint-disable-next-line
	}, [error, isAuthenticated, props.history])

	const [user, setUser] = useState({
		name: '',
		email:'',
		password: '',
		password2:''
	})

	const { name, email, password, password2 } = user;

	const onChange = e => setUser({...user, [e.target.name]: e.target.value })

	const onSubmit = e => {
		e.preventDefault();
		if(name === '' || email === '' || password === ''){
			setAlert('Please enter all fields');
		}else if(password !== password2){
			setAlert('Passwords do not match');
		}else{
			register({
				name,
				email,
				password
			})
		}
		
	}
	return (
		<div className="row">
			<div className="col m12 l6 offset-l3">
				<h3>
					Account <span className="teal-text text-lighten-1">Register</span>
				</h3>
				<form>
					<div className="input-field">
						<label htmlFor="name">Name</label>
						<input type="text" name="name" value={name} onChange={onChange} required />
					</div>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" value={email} onChange={onChange} required />
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input type="password" name="password" value={password} onChange={onChange} required minLength="6"/>
					</div>
					<div className="input-field">
						<label htmlFor="password2">Confirm Password</label>
						<input type="password" name="password2" value={password2} onChange={onChange} required minLength="6"/>
					</div>
					<div className="input-field right-align">
						<button onClick={onSubmit} className="btn-large waves-effect waves-light" type="submit" name="action">
							Submit
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


export default connect(mapStateToProps, {register, clearErrors, setAlert})(Register);
