const Invitation = require("../models/invitation");

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();


//TODO: put db logic to services
function deleteInvitationByQuery(query){
    return new Promise(function(resolve, reject){
        Invitation.findOne(query).exec()
            .then(function(invitation){
                invitation.remove(function (err) {
                    if(err){
                        reject('error in deleting')
                    }
                    else{
                        resolve()
                    }
                })
            })
            .catch(reject)
    })
}

function checkInvitation(req, res, next){
    var token = req.body.token;
    var currentTime = Math.floor(new Date().getTime() / 1000)
    Invitation.findOne({token:token}).exec()
        .then(function(invitation){
            if(invitation && invitation.expires_at > currentTime){
                res.status(200)
            }
            else if(invitation && invitation.expires_at <= currentTime){
                invitation.remove();
                res.status(401)
            }
            else{
                res.status(401)
            }
            res.send({})
        })
        .catch(function(err){
            console.error(err)
            res.status(500);
            res.send({})
        })
}



function generateToken()
{
    var text = "";
    var possible = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz123456789";

    for( var i=0; i < 12; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function createInvitation(req, res, next){//TODO: put this logic to User;
    var user = req.user;
    if(typeof(req.body.invitationData.expires_at) == 'number'){
        var invitationData = req.body.invitationData;

        var invitation = new Invitation();
        Object.assign(invitation, invitationData);
        invitation.user_id = user._id;
        invitation.token = generateToken();
        invitation.save(function(err, savedInvitation){
            var invitationLink = req.protocol + '://'+ req.hostname +':8000/app?token=' + savedInvitation.token;//TODO: hardcode
            if(!err){
                if(invitationData.inviteType == 'email'){
                    transporter.sendMail({
                        from: 'info@trust-forum.net',
                        to: invitationData.invitationEmail,
                        subject: 'Invitation link',
                        html:invitationData.message + '<br>'+ 'Your invitation link is:' + invitationLink
                    }, function(error, response) {
                        if (error) {
                            console.log(error);
                        } else{
                            res.status(200).json({
                                send_status: 'done'
                            });
                        }
                    });
                }
                else{
                    res.json({invitationLink:invitationLink})
                }
            }
        })
    }
    else{
        res.status(403);
        res.send()
    }
}

module.exports = {
    createInvitation:createInvitation,
    checkInvitation:checkInvitation,
    deleteInvitationByQuery:deleteInvitationByQuery
};
