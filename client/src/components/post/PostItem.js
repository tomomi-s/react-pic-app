import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPost } from '../../action/postActions';
import PropTypes from 'prop-types';

export const PostItem = ({post, setCurrentPost}) => {
	let tool = '';
	(post.tool === 1) ? tool = 'Adobe Lightroom'
	: (post.tool === 2) ? tool = 'VSCO'
	: tool = 'Snapseed';

	return (
		<div className="row" style={{ marginTop: 10 }}>


			<div className="card">
			    <div className="card-image waves-effect waves-block waves-light">
			      <img className="col s12 m6" style={{ padding: 0}} src={`/${post.photo_before['path']}`} alt=""/>
			      <img className="col s12 m6" style={{ padding: 0}} src={`/${post.photo_after['path']}`} alt=""/>
			    </div>
			    <div className="card-content">
			      <span className="card-title activator grey-text text-darken-4">{tool}<i className="material-icons right">more_vert</i></span>
			    </div>
			    <div className="card-reveal">
			      <span className="card-title grey-text text-darken-4">Recipe<i className="material-icons right">close</i></span>
			      <p>{post.process}</p>
			      <div className="fixed-action-btn">
					<a style={{ marginRight: 5}} className="btn-floating btn-large waves-effect waves-light teal lighten-1"  href={`/post/${post._id}`}><i className="material-icons">edit</i></a>
					<a href="#delete-post-modal" onClick={()=> setCurrentPost(post)} className="btn-floating btn-large waves-effect waves-light red lighten-2 modal-trigger"><i className="material-icons">delete</i></a>
				  </div>
			    </div>
			 </div>
			
		</div>
	)
}

PostItem.propTypes = {
	post: PropTypes.object,
	setCurrentPost: PropTypes.func.isRequired,
}
export default connect(null, { setCurrentPost })(PostItem)
