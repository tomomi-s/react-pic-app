const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
	path:  { type: String },
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
	date:{type: Date, default: Date.now}
})

module.exports = mongoose.model('Photo', PhotoSchema)