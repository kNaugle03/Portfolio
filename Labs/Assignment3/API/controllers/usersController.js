var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test/users:27017');

var User = require('../models/user');


module.exports.index = function(req, res) {
    User.find(function(err, users) {
        if (err)
            res.send(err);
        else
            res.json(users);
    });
}

module.exports.store = function(req, res) {

    var user = new User();      // create a new instance of the User model
    user.name = req.body.name;  // set the users name (comes from the request)
    user.password = req.body.password;  // set the users password (comes from the request)


    // save the user and check for errors
    user.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'User created!' });
    });

};
