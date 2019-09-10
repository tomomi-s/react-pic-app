import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../action/authActions';
import { addPost, clearPostErrors } from '../../action/postActions';
import { setAlert } from '../../action/alertActions';

const AddPost = ({props,loadUser, addPost, clearPostErrors, setAlert, error}) => {
	useEffect(()=> {
		loadUser();

		if(error){
			setAlert(error);
			clearPostErrors();
		}
		//eslint-disable-next-line
	}, [error])

	const [post, setPost] = useState({
		photo_before: null,
		photo_after: null,
		photo_before_url: null,
		photo_after_url: null,
		tool: 0,
		process: ''
	});

	const { photo_before, photo_after, photo_before_url, photo_after_url, tool, process } = post;


	const onChange = e => {
		let url = null;
		if(e.target.name === 'photo_before'){
			url = URL.createObjectURL(e.target.files[0])
			setPost({...post, [e.target.name]: e.target.files[0], photo_before_url: url })
		}else if (e.target.name === 'photo_after'){
			url = URL.createObjectURL(e.target.files[0])
			setPost({...post, [e.target.name]: e.target.files[0], photo_after_url: url })
		}else{
			setPost({...post, [e.target.name]: e.target.value})
		}
	

	}

	const resetFile = e => {
		if(e.target.name === 'photo_before'){
		    setPost({...post, [e.target.name]: null,  photo_before_url: null})
		}else if (e.target.name === 'photo_after'){
			setPost({...post, [e.target.name]: null,  photo_after_url: null})
		}
	}

	const onSubmit = e => {
		e.preventDefault();

		const data = new FormData();
		data.append('tool', tool);
		data.append('process', process);
		data.append('photo_before', photo_before);
		data.append('photo_after', photo_after);
		
		addPost(data);
		if(!error){
			props.history.push('/');
		}
	}

	return(
		<form onSubmit={onSubmit} encType="multipart/form-data">
			<div className="row">
				<div className="col s6">
					<h5 className="center-align">Before</h5>
					<div className="upload-button-wrap center-align">
						<label className="btn waves-effect waves-light" htmlFor="upload">
							<i className="material-icons left">add_a_photo</i>
							{photo_before ? (<span>Change picture</span>)
								   : (<span>Upload picture</span>)

							}	
						</label>
						<input id="upload" type="file" name="photo_before" onChange={onChange} />
					</div>

					{photo_before_url && (
					<img style={{ width: "100%", padding: 10 }} src={photo_before_url} alt="photo_before"/>
					)}

					{photo_before && (
		        		<div style={{ textAlign: "center" }}>
		            		<input type="button" value="Remove File" name="photo_before" className="btn waves-effect waves-light red lighten-2" onClick={resetFile} />
		        		</div>
		        	)}
		        	
	        	</div>

	        	<div className="col s6">
					<h5 className="center-align">After</h5>
					<div className="upload-button-wrap center-align">
						<label className="btn waves-effect waves-light" htmlFor="upload_after">
							<i className="material-icons left">add_a_photo</i>
							{photo_after ? (<span>Change picture</span>)
								   : (<span>Upload picture</span>)

							}	
						</label>
						<input id="upload_after" type="file" name="photo_after" onChange={onChange} />
					</div>

					{photo_after_url && (
					<img style={{ width: "100%", padding: 10 }} src={photo_after_url} alt="photo_after"/>
					)}

					{photo_after && (
		        		<div style={{ textAlign: "center" }}>
		            		<input type="button" value="Remove File" name="photo_after" className="btn waves-effect waves-light red lighten-2" onClick={resetFile} />
		        		</div>
		        	)}	
	        	</div>

	        	<div className="col s12">
					<div className="input-field">
						<select name="tool" value={tool} onChange={onChange}>
					      <option value="0" disabled>Choose your tool</option>
					      <option value="1">Adobe Lightroom</option>
					      <option value="2">VSCO</option>
					      <option value="3">Snapseed</option>
					    </select>
					    <label htmlFor="tool">Software/App</label>
					</div>
					<div className="input-field">
						<textarea rows="4" className="materialize-textarea" name="process" value={process} onChange={onChange}></textarea>
	         			<label htmlFor="">Process</label>
					</div>
					{	(photo_before && photo_after && (tool !== 0)) &&
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

const mapStateToProps = (state, ownProps) => ({
	error: state.post.error,
	props: ownProps
})

export default connect(mapStateToProps, {addPost, clearPostErrors, loadUser, setAlert})(AddPost);
