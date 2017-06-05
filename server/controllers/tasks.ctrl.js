var path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//models
var Task = require('../models/tasks'),
    User = require('../models/user');

//Index
exports.index = function (req,res){
    var userId = req.user._id;
    console.log(req.user);
    var task = Task;
    task.find({_userid: userId})
        .sort({ name: 1})
        .populate('lists')
        .exec(function (error, data) {
            if (data) {
                res.json(data);
            } else if (error) {
                console.error(error.stack);
            }
        })
}

//Show Existing Task
exports.show = function (req, res){
    Task.find({_id: req.params.task_id}, function (error,data){
        if (data) {
            res.json(data)
        } else if (error){
            console.error(error.stack);
        }
    })
}

//Create New Task
exports.create = function(req,res){
    var userId = req.user._id;
    var task = new Task ({name: req.body.name, _userid: userId});
    task.save(function (error,data) {
        if (data) {
            User.findOne({_id: userId}, function (err, user){
                if (err) {
                    console.log(err);
                } else {
                    var id = mongoose.Types.ObjectId(task._id);
                    user.boards.push(id);
                    user.save();
                    //what if error occurs here?
                    //change the console logs to message to users
                    res.json(data);
                }
            })
        } else if (error) {
            console.error(error.stack);
        }
    })
}

//Update Existing task
//include error handling
exports.edit = function (req,res){
    var query = { _id: req.params.task_id};
    Task.update(query, {name: req.body.name}, function (error,data){
        Task.find({}, function (error, task) {
            res.json(task);
        })
    })
}

//Invite members to task
exports.inviteUser = function (req,res){
    var boardId = req.params.task_id;
    var memberName = req.body.username;
    var query = {username: memberName};
    User.findOne(query, function (error,invitee){
        if (invitee) {
            invitee.boards.push(boardId);
            invitee.save();
            res.json(invitee);
        } else if (error) {
            console.error(error.stack);
        }
    })

}

//Destroy Existing task
exports.destroy = function (req,res){
    var task = new Task({_id: req.params.task_id});
    task.remove(function (error,data) {
        if (data) {
            res.json(data);
        } else if(error) {
            console.error(error.stack);
        }
    })
}
