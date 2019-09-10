import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { deletePost } from '../../action/postActions';

const DeletePostModal = ({ current_post, deletePost }) => {
	const onSubmit = () => {
		deletePost(current_post._id)
	}

	return (
		<div id="delete-post-modal" className="modal">
			<div className="modal-content">
		      <h4>Delete Post</h4>
		      <p>Are you sure to dedete this psot?</p>
		    </div>
		    <div className="modal-footer">
		    	<a href="#!" className="modal-close waves-effect waves-green btn-flat">No</a>
		     	<a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={onSubmit}>Yes</a>
		    </div>
		</div>
	)
}

DeletePostModal.propTypes = {
	current_post: PropTypes.object,
	deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	current_post: state.post.current_post
})


export default connect(mapStateToProps, {deletePost})(DeletePostModal)