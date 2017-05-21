const AWS = require('aws-sdk')
    , multer = require('multer')
    , multerS3 = require('multer-s3')
    , randomstring = require('randomstring')
    , config = require('config')
    , mime = require('mime');


const s3 = new AWS.S3({ signatureVersion: 'v4' });

module.exports = (req, res, next) => {
    return multer({
        storage: multerS3({
            s3,
            bucket: config.get('upload.S3.bucket'),
            acl: 'public-read',
            contentDisposition: 'inline',
            contentType: function(req, file, cb) {
                cb(null, file.mimetype);
            },
            metadata: function (req, file, cb) {
                cb(null, {
                    fieldName: file.fieldname,
                    user: req.user.id
                });
            },
            key: function (req, file, cb) {
                if (!config.get('upload.avatar.allowedMimes').includes(file.mimetype)) {
                    let error = {
                        error: {
                            message: 'Invalid file type. Only .jpg and .png images are allowed.'
                        }
                    };
                    res.send(error);
                    cb(error);
                    return;
                }
                cb(null, config.get('upload.avatar.dir') + randomstring.generate(16) + '.' + mime.extension(file.mimetype));
            }
        })
    }).single('avatar')(req, res, next);
};