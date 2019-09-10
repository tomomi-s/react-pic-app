import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import PostItem from './PostItem';
import { getPosts } from '../../action/postActions';
import PropTypes from 'prop-types';

const Posts = ({posts, loading, getPosts}) => {
	useEffect(() => {
		getPosts();
		console.log('post')
		
		// eslint-disable-next-line
	}, [])

	if(loading || posts.length === 0){
		return <Preloader />
	}
	return (
		<div>
			{
				!loading && posts.length === 0 ? (
					<p className="center">No posts to show...</p>
				) : (
					posts.map(post => <PostItem key={post._id} post={post} />)
				)
			}
		</div>
	)
}

Posts.propTypes = {
	posts: PropTypes.array.isRequired,
	getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	posts: state.post.posts,
	loading: state.post.loading,
	error: state.post.error,
})

export default connect(mapStateToProps, {getPosts})(Posts);