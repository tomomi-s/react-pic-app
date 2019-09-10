import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import Posts from '../post/Posts';
import { loadUser } from '../../action/authActions';

const Home = ({loadUser}) => {
	// I don't need to run loadUser here?
	useEffect(()=> {
		loadUser();
		console.log('home')
		//eslint-disable-next-line
	}, [])

	return (
		<Fragment>
			<Posts />
			<div className="fixed-action-btn">
				<a className="btn-floating btn-large waves-effect waves-light red" href="/post/new"><i className="material-icons">add</i></a>
			</div>
		</Fragment>
	)
}


export default connect(null, {loadUser})(Home);