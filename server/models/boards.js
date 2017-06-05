// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Tasks = require('./tasks')

//create a schema for board
var boardSchema = new Schema({
    _userid: [{type: Schema.Types.ObjectId, ref: 'User'}],
    name: {type: String, required: true, unique: true},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    content: String,
    statusClass: String,
    tagName: String,
    created_at: Date,
    updated_at: Date
});

var Board = mongoose.model('Board', boardSchema);

module.exports = Board;