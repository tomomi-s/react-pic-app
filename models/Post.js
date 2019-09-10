const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	photo_before: {type: mongoose.Schema.Types.ObjectId, ref: 'Photo'},
	photo_after: {type: mongoose.Schema.Types.ObjectId, ref: 'Photo'},
	tool: {type: Number},
	process: {type: String},
	date:{type: Date, default: Date.now}
})

module.exports = mongoose.model('Post', PostSchema)