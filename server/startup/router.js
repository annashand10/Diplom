const bodyParser = require('body-parser')
    , express = require('express')
    , config = require('config')
    , cors = require('cors')
    , morgan = require('morgan')
    , jwt = require('jwt-simple')
    , passport = require('passport')
    , mongoose = require('mongoose')


var User = require('../models/User');
const secret = 'bigsecret';

//controllers
var BoardController = require('../controllers/boards.ctrl.js'),
    EmployeesController = require('../controllers/employees.ctrl.js'),
    ProjectController = require('../controllers/projects.ctrl.js'),
    TasksController = require('../controllers/tasks.ctrl.js'),
    UserController = require('../controllers/user.ctrl.js');

module.exports = (app) => {


    console.log(app, 'app');
    // Add middleware
    app.use(cors());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(passport.initialize());


    app.use(morgan('dev'));
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.post('/api/v1/authenticate', function (req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) throw err;

            if (!user) {
                res.send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.encode(user, secret);
                        console.log(token, 'token')
                        // return the information including token as JSON
                        res.json({success: true, token: 'JWT ' + token, userId: user._id});
                    } else {
                        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                });
            }
        });
    });

    app.post('/api/v1/signin', function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
                email: req.body.email,
                password: req.body.password,
                profile:[],
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                auth_strategy:req.body.auth_strategy
            });
            // save the user
            newUser.save(function (err) {
                if (err) {
                    return res.json({success: false, msg: 'Email already exists.'});
                }
                res.json({
                        token: '',
                        success: true,
                        msg: 'Successful created new user.'
                    }
                );
            });
        }
    });


    app.get('/api/v1/home', ensureAuthorized, function (req, res) {
        User.findOne({token: req.token}, function (err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                res.json({
                    type: true,
                    data: user
                });
            }
        });
    });
//--------------------routes for user--------------------
//index
    app.get('/api/users', UserController.index)

//show existing user
    app.get('/api/user/:id', UserController.show)

//create new user
    app.post('/api/users/create', UserController.create)

//update existing user
    app.post('/api/users/edit/', UserController.edit)

//invte non-creator users to board
    app.post('/api/user/:member_id/invite/', UserController.inviteUser)

//delete existing user
    app.post('/api/users/delete/:id', UserController.destroy)


//--------------------routes for board--------------------
//index
    app.get('/api/v1/boards', BoardController.index)

//show existing board
    app.get('/api/v1/board/:board_id', BoardController.show)

//create new board
    app.post('/api/v1/boards/create/', BoardController.create)

//update existing board
    app.put('/api/v1/boards/edit/:board_id', BoardController.edit)

//invite non-creator users to board
    app.post('/api/v1/board/:board_id/invite/', BoardController.inviteUser)

//delete existing board
    app.delete('/api/v1/boards/delete/:board_id', BoardController.destroy)


    //--------------------routes for employees--------------------
//index
    app.get('/api/v1/employees', EmployeesController.index)

//show existing board
    app.get('/api/v1/employee/:employee_id', EmployeesController.show)

//create new board
    app.post('/api/v1/employees/create/', EmployeesController.create)

//update existing board
    app.post('/api/v1/employees/edit/:employee_id', EmployeesController.edit)

//invite non-creator users to board
    app.post('/api/v1/employees/:employee_id/invite/', EmployeesController.inviteUser)

//delete existing board
    app.delete('/api/v1/employees/delete/:employee_id', EmployeesController.destroy)

    //--------------------routes for projects--------------------
//index
    app.get('/api/v1/projects', ProjectController.index)

//show existing board
    app.get('/api/v1/projects/:project_id', ProjectController.show)

//create new board
    app.post('/api/v1/projects/create/', ProjectController.create)

//update existing board
    app.post('/api/v1/projects/edit/:project_id', ProjectController.edit)

//invite non-creator users to board
    app.post('/api/v1/project/:project_id/invite/', ProjectController.inviteUser)

//delete existing board
    app.delete('/api/v1/projects/delete/:project_id', ProjectController.destroy)

    // //invitations
    // app.put('/api/v1/check_token', InvitationController.checkInvitation);
    // app.post('/api/v1/create_invitation', authMiddleware, InvitationController.createInvitation)

    function getToken(headers) {
        if (headers && headers.authorization) {
            var parted = headers.authorization.split(' ');
            if (parted.length === 2) {
                return parted[1];
            } else {
                return null;
            }
        } else {
            return null;
        }
    };

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    }
};