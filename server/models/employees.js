// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for todo
var employeeSchema = new Schema({
    //This is the equivalent of list_id
    _userid: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    first_name: String,
    last_name: String,
    department: String,
    occupation: String,
    status: String,
    created_at: Date,
    updated_at: Date,
    id:String
});

module.exports = mongoose.model('Employee', employeeSchema);