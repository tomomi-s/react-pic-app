import axios from 'axios';

import { 
	GET_POSTS, 
	ADD_POST, 
	DELETE_POST, 
	UPDATE_POST,
	SET_CURRENT_POST,
	POST_ERROR,
	CLEAR_POST_ERRORS,
	SET_LOADING, } from './types';

//Get posts
export const getPosts = () => async dispatch => {
	try{
		setLoading();

		const res = await axios.get('/api/posts');
		dispatch({
			type: GET_POSTS,
			payload: res.data
		})
	}catch(err){
		dispatch({
			type: POST_ERROR, 
			payload: err.response.data.msg
		})
	}
}

//Get posts
export const getPost = (id) => async dispatch => {
	try{
		setLoading();

		const res = await axios.get(`/api/posts/${id}`);
		dispatch({
			type: SET_CURRENT_POST,
			payload: res.data
		})
	}catch(err){
		dispatch({
			type: POST_ERROR, 
			payload: err.response.data.msg
		})
	}
}

//Add new post
export const addPost = (post) => async dispatch =>{
	const config = {
			headers : {
				'Content-Type': 'multipart/form-data; boundary=<somestring>'
			}
	}

	try{
		setLoading();
		const res = await axios.post('/api/posts', post, config);

		dispatch({
			type: ADD_POST,
			payload: res.data
		})

	}catch(err){
		dispatch({
			type: POST_ERROR,
			payload: err.response.data.msg
		})
	}
}
//Delete post
export const deletePost = (id) => async dispatch => {
	try{
		setLoading();

		await axios.delete(`/api/posts/${id}`)

		dispatch({
			type: DELETE_POST,
			payload: id
		})

	}catch(err){
		dispatch({
			type: POST_ERROR,
			payload: err.response.data.msg
		})
	}
		
	
}
//Update post
export const updatePost = (post) => async dispatch => {
	console.log(post)
	const config = {
			headers : {
				'Content-Type': 'application/json'
			}
	}
	try{
		setLoading();

		const res = await axios.put(`/api/posts/${post._id}`, post, config);

		dispatch({
			type: UPDATE_POST,
			payload: res.data
		})

	}catch(err){
		dispatch({
			type: POST_ERROR,
			payload: err.response.data.msg
		})
	}
		
	
}

//Set current log
export const setCurrentPost = post => {
	return {
		type: SET_CURRENT_POST,
		payload: post
	}
}

// Set loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING
	}
}

//Clear Errors
export const clearPostErrors = () => {return({type: CLEAR_POST_ERRORS})}