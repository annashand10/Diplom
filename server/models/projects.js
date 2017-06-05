// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for todo
var projectSchema = new Schema({
    //This is the equivalent of list_id
    title: String,
    description: String,
    status: String,
    participants: Array,
    client: String,
    owner: String,
    created_at: Date,
    updated_at: Date
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;