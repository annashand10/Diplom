var path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

//models
var Employee = require('../models/employees'),
    User = require('../models/user');

//Index
exports.index = function (req,res){
    // console.log(req.params.userId,'userId');
    // var userId = req.params.userId;
    // console.log(req.user);
    var employee = Employee;
    employee.find({})
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

//Show Existing Employee
exports.show = function (req, res){
    console.log(req.params,'req.params.employee_id')
    Employee.find({_id: req.params.employee_id}, function (error,data){
        if (data) {
            res.json(data)
        } else if (error){
            console.error(error.stack);
        }
    })
}

//Create New Employee
exports.create = function(req,res){
    // var userId = req.user._id;
    var employee = new Employee (req.body);
    employee.save(function (error,data) {
        if (data) {
            res.json(data);
            // User.findOne({_id: userId}, function (err, user){
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         var id = mongoose.Types.ObjectId(employee._id);
            //         user.boards.push(id);
            //         user.save();
            //         //what if error occurs here?
            //         //change the console logs to message to users
            //         res.json(data);
            //     }
            // })
        } else if (error) {
            console.error(error.stack);
        }
    })
}

//Update Existing employee
//include error handling
exports.edit = function (req,res){
    console.log(req.params.employee_id,'req.params.employee_id}')
    console.log(req.body.first_name,'req.body.first_name')
    var query = { _id: req.params.employee_id};
    Employee.update(query, {first_name: req.body.first_name}, function (error,data){
        Employee.find({}, function (error, employee) {
            res.json(employee);
        })
    })
}

//Invite members to employee
exports.inviteUser = function (req,res){
    var boardId = req.params.employee_id;
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

//Destroy Existing employee
exports.destroy = function (req,res){
    var employee = new Employee({_id: req.params.employee_id});
    employee.remove(function (error,data) {
        if (data) {
            res.json(data);
        } else if(error) {
            console.error(error.stack);
        }
    })
}
