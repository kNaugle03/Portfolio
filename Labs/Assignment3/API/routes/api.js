var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');

var restaurantsController = require('../controllers/restaurantsController');
var usersController = require('../controllers/usersController');
var authController = require('../controllers/authController');

//a little middleware that logs everytime the routFer is accessed
// router.use(function(req,res,next){
//
//     console.log("Something is happening in the API");
//     next();
//
// });

router.use(function(req, res, next) {

    //ignore for authenticate path
    if( req.path == '/authenticate') {
        return next();
    }

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.json({ message: 'Welcome to our api' });
});

router.get('/restaurants', restaurantsController.index);
router.post('/restaurants', restaurantsController.store);

router.get('/restaurants/:_id', restaurantsController.show);
router.put('/restaurants/:_id', restaurantsController.update);
router.delete('/restaurants/:_id', restaurantsController.destroy);

router.get('/users', usersController.index);
router.post('/users', usersController.store);

router.post('/authenticate', authController.authenticate);


module.exports = router;