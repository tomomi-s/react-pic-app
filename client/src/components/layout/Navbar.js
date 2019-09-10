import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout, loadUser } from '../../action/authActions';

const Navbar = ({props, title, icon, isAuthenticated, logout, user, loadUser}) => {
	const onLogout = () => {
		logout();
		// clearContacts();
	}

	const authLinks = (
		<Fragment>
			<li>Hello { user && user.name.charAt(0).toUpperCase() + user.name.slice(1)}</li>
			<li>
				<a onClick={onLogout} href="#!">
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	)

	const guestLinks = (
		<Fragment>
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</Fragment>
	)

	return (
		<nav>
		    <div className="nav-wrapper">
		      <a href="/" className="brand-logo"><i className={icon} style={{marginLeft: 15}}/> {title}</a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        {isAuthenticated ? authLinks : guestLinks}
		      </ul>
		    </div>
		</nav>
	)
}

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
}

Navbar.defaultProps = {
	title: 'Reciphy',
	icon: 'fas fa-camera-retro'
}

const mapStateToProps = (state, props) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	props: props
})


export default connect(mapStateToProps, {logout, loadUser})(Navbar);