var User = require('../models/user');
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');
var bcrypt = require('bcrypt-nodejs');

module.exports.authenticate = function(req, res) {

    // find the user
    User.findOne({
        name: req.body.name
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            bcrypt.compare(req.body.password, user.password, function(err, isMatch){
                if (err) res.json({ success: false, message: 'Something went horribly wrong' });

                if (!isMatch) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    // we don't want to pass in the entire user since that has the password
                    const payload = {
                        //admin: user.admin
                        name: user.name
                    };
                    var token = jwt.sign(payload, config.secret, {
                        expiresIn : 60*60*24 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            });

        }

    });
};
