var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Task = new mongoose.Schema({
    name: String,
    description: String,
    assignee: {
        type: ObjectId,
        ref: 'User'
    },
    statusClass: {
        type: String,
        default: 'info'
    },
    boardId: {
        type: ObjectId,
        ref: 'Board'
    },
    date: {
        type: String
    }
});

Task.methods.getViewModel = function () {
    return {
        name: this.name,
        description: this.description,
        statusClass: this.statusClass
    };
};

module.exports = mongoose.model('Task', Task);