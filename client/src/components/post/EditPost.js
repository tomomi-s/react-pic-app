import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from '../layout/Preloader';
import { loadUser } from '../../action/authActions';
import { getPost, updatePost, clearPostErrors } from '../../action/postActions';
import { setAlert } from '../../action/alertActions';

const EditPost = ({match, props, current_post, loading, loadUser, getPost, updatePost, clearPostErrors, setAlert, error}) => {
	
	const [post, setPost] = useState({
		photo_before_url: null,
		photo_after_url: null,
		tool: 0,
		process: ''
	});

	useEffect(()=> {
		if(!current_post){
			loadUser();
			getPost(match.params.id)
		}else{
			setPost({
				_id: current_post._id,
				photo_before_url: current_post.photo_before['path'],
				photo_after_url: current_post.photo_after['path'],
				tool: current_post.tool,
				process: current_post.process
			})
		}

		if(error){
			setAlert(error);
			clearPostErrors();
		}	
		
		//eslint-disable-next-line
	}, [error, current_post])

	const { _id, photo_before_url, photo_after_url, tool, process } = post;

	const onChange = e => {
		setPost({...post, [e.target.name]: e.target.value})
	}

	const onSubmit = e => {
		e.preventDefault();

		const data = {
			_id,
			tool,
			process
		}
		console.log(data)
		updatePost(data);
		if(!error){
			props.history.push('/');
		}
	}



	if(loading || current_post === null){
		return <Preloader />
	}
	return (
		<form onSubmit={onSubmit} encType="multipart/form-data">
			<div className="row">
				<div className="col s6">
					<h5 className="center-align">Before</h5>
					<img style={{ width: "100%", padding: 10 }} src={`/${photo_before_url}`} alt="photo_before" />
	        	</div>

	        	<div className="col s6">
					<h5 className="center-align">After</h5>
					<img style={{ width: "100%", padding: 10 }} src={`/${photo_after_url}`} alt="photo_after" />	
	        	</div>
	        </div>
	        <div className="row">
	        	<div className="col s12">
					<div className="input-field">
						<label htmlFor="tool" className="active">Software/App</label>
						<select id="tool" name="tool" value={tool} onChange={onChange} className="browser-default validate">
					      <option value="0" disabled>Choose your tool</option>
					      <option value="1">Adobe Lightroom</option>
					      <option value="2">VSCO</option>
					      <option value="3">Snapseed</option>
					    </select>  
					</div>
				</div>
			</div>
			<div className="row">
	        	<div className="col s12">
					<div className="input-field">
						<label htmlFor="process" className="active">Process</label>
						<textarea id="process" rows="4" className="materialize-textarea validate" name="process" value={process} onChange={onChange}></textarea>
	         			
					</div>
				</div>
			</div>
			<div className="row">
	        	<div className="col s12">
					{	(tool !== 0) &&
						(<div className="input-field right-align">
							<input  className="btn-large waves-effect waves-light input-button"
									type="submit"
									value="Post"
									/>
								
						</div>)
					}
				</div>
	        </div>
		</form>
	)
}

EditPost.propTypes = {

}

const mapStateToProps = (state, ownProps) => ({
	error: state.post.error,
	current_post: state.post.current_post,
	loading: state.post.loading,
	props: ownProps
})

export default connect(mapStateToProps, {loadUser, getPost, updatePost, clearPostErrors, setAlert})(EditPost);