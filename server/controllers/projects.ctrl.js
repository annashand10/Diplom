var path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//models
var Project = require('../models/projects'),
    User = require('../models/user');

//Index
exports.index = function (req,res){
    // var userId = req.user._id;
    // console.log(req.user);
    var project = Project;
    project.find()
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

//Show Existing Project
exports.show = function (req, res){
    Project.find({_id: req.params.project_id}, function (error,data){
        if (data) {
            res.json(data)
        } else if (error){
            console.error(error.stack);
        }
    })
}

//Create New Project
exports.create = function(req,res){
    // var userId = req.user._id;
    var project = new Project ({
        title: req.body.title,
        description:req.body.description,
        status: req.body.status,
        client:req.body.status,
        owner:req.body.owner
    });
    project.save(function (error,data) {
        if (data) {
            console.log(data, 'project data')
            var id = mongoose.Types.ObjectId(project._id);
            project.save();
            res.json(data);
            // User.findOne({_id: userId}, function (err, user){
            //     if (err) {
            //         console.log(err);
            //     } else {
            //
            //     }
            // })
        } else if (error) {
            console.error(error.stack);
        }
    })
}

//Update Existing project
//include error handling
exports.edit = function (req,res){
    var query = { _id: req.params.project_id};
    Project.update(query, {name: req.body.name}, function (error,data){
        Project.find({}, function (error, project) {
            res.json(project);
        })
    })
}

//Invite members to project
exports.inviteUser = function (req,res){
    var boardId = req.params.project_id;
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

//Destroy Existing project
exports.destroy = function (req,res){
    var project = new Project({_id: req.params.project_id});
    project.remove(function (error,data) {
        if (data) {
            res.json(data);
        } else if(error) {
            console.error(error.stack);
        }
    })
}
