const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const path   = require('path');
const multer = require('multer');
const auth = require('../middleware/auth');
const User = require('../models/User')
const Post = require('../models/Post');
const Photo = require('../models/Photo');
var upload    = require('./upload');


//@route GET api/posts
//@desc Get all posts
//@access Private
router.get('/', auth, async(req, res)=>{
	try{
		Post.find({user: req.user.id})
		.sort({date: -1})
		.populate([
			{path: 'photo_before', model: 'Photo'},
			{path: 'photo_after', model: 'Photo'}
		])
		.exec((err, posts)=>{
			if(err) res.status(400).json({msg:'No posts found'})
			res.json(posts);
		})

	}catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}
})

//@route GET api/posts/:id
//@desc Get a post
//@access Private
router.get('/:id', auth, async (req, res) => {
	try{
		Post.findOne({_id: req.params.id})
		.populate([
			{path: 'photo_before', model: 'Photo'},
			{path: 'photo_after', model: 'Photo'}
		])
		.exec((err, post)=>{
			if(err) res.status(400).json({msg:'No posts found'})
			else if(!post) res.status(400).json({msg:'No post found'})
			else if(post.user != req.user.id) res.status(400).json({msg:'Not authorized'})
			res.json(post);
		})

	} catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}
})


//@route POST api/post
//@desc Add new post
//@access Private
router.post('/', 
	[
		auth

	], async(req, res) => {


		const errors = validationResult(req);

		if(!errors.isEmpty()){
			console.log(errors.array())
			return res.status(400).json({errors: errors.array()});
		}
		

		try{

			const new_photos = ()=>{
				return new Promise((resolve, reject) => {
				 	upload(req, res,(err) => {
				    	if(err){
				    		console.log(err)
							reject('Photo is not saved')
				     	}else{
				        	if(req.files == undefined){ 
				        	reject('Photo is not sent')
				        	}else{
				            	const files = [req.files['photo_before'][0], req.files['photo_after'][0]]
			        			const promises = files.map(async(file)=>{
			        				return await save_photo(file)
					        	})

					        	Promise.all(promises)
					        	.then((completed)=>{
					        		const obj = {
						        		photos: completed,
						        		tool: req.body.tool,
						        		process: req.body.process
						        	}
					        		resolve(obj)
					        	})
					        	
				    		}
				    	}
					});

				})
			}

			
			const new_post = async(obj)=>{
				return new Promise((resolve, reject) => {
					var post = new Post({
						photo_before: obj.photos[0],
						photo_after: obj.photos[1], 
						tool: obj.tool,
						process: obj.process, 
						user: req.user.id
					})

					post.save((err, new_post)=>{
						if(err){
							console.log(err)
							reject('Something went wrong');
						}else{
							resolve(new_post);
						}
						
					})
				})
			}

			const save_photo = async(file)=>{
				return new Promise((resolve, reject) => {
					var fullPath = "files/"+file.filename;
					console.log(fullPath)
		            var document = {
		              path:     fullPath, 
		              user:   req.user.id
		            };
	  
		        	var photo = new Photo(document); 
		        	photo.save(function(err, new_photo){
			            if(err){ 
			              reject(err);
			            }
		            	resolve(new_photo._id);
		        	});
				})
			}

			async function createPhotoAndPost(){
				try{
					const saved_photos = await new_photos();
					const post = await new_post(saved_photos);
					res.json(post);
					console.log("success")
				}catch(err){
					console.log(err)
					res.status(500).json({msg: err})
				}

			}

			createPhotoAndPost()

		} catch(err){
			console.error(err);
			res.status(500).send('Server Error')
		}
})

//@route PUT api/posts/:id
//@desc Update contact
//@access Private
router.put('/:id', auth, async (req, res) => {
	console.log(req.body)
	try{
		Post.findByIdAndUpdate(req.params.id, {
			tool: req.body.tool,
			process: req.body.process
		}, { new: true }, (err, post)=>{
			if(err) res.status(400).json({msg:'No post found'})
			else if(!post) res.status(400).json({msg:'No post found'})
			else if(post.user != req.user.id) res.status(400).json({msg:'Not authorized'})
			res.json(post)
		})
	} catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}
})


//@route DELETE api/post/:id
//@desc Delete Post
//@access Private
router.delete('/:id', auth, async (req, res) => {
	try{
		Post.findByIdAndRemove(req.params.id, (err, post)=>{
			if(err) res.status(400).json({msg:'No post found'})
			else if(!post) res.status(400).json({msg:'No post found'})
			else if(post.user != req.user.id) res.status(400).json({msg:'Not authorized'})
			res.json('Post removed')
		})

	} catch(err){
		console.error(err);
		res.status(500).send('Server Error')
	}
})


module.exports = router;
