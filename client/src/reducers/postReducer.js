import { 
	GET_POSTS, 
	ADD_POST, 
	DELETE_POST, 
	UPDATE_POST, 
	SET_CURRENT_POST,
	POST_ERROR,
	CLEAR_POST_ERRORS,
	SET_LOADING, } from '../action/types';


const initialState = {
	posts: [],
	current_post: null,
	loading: true,
	error: null
}

export default (state = initialState, action) => {
	switch(action.type){
	case GET_POSTS:
		return{
			...state,
			posts: action.payload,
			loading: false
		}
	case ADD_POST:
		return{
			...state,
			loading: false
		}
	case DELETE_POST:
		return{
			...state,
			posts: state.posts.filter(post => post._id !== action.payload),
			loading: false
		}
	case UPDATE_POST:
		return{
			...state,
			posts: state.posts.map(post=> post._id === action.payload._id ? action.payload: post),
			loading: false
		}
	case SET_LOADING:
		return{
				...state,
				loading: true
		}
	case POST_ERROR:
		console.error(action.payload);
		return{
			...state,
			error: action.payload
		}
	case SET_CURRENT_POST:
		return{
			...state,
			current_post: action.payload,
			loading: false

		}
	case CLEAR_POST_ERRORS: 
		return{
			...state,
			error: null
		}

	default:
			return state;
	}
}