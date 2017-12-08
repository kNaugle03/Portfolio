var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test/restaurants:27017');

var Restaurant = require('../models/restaurant');


module.exports.index = function(req, res) {
    Restaurant.find(function(err, restaurants) {
        if (err)
            res.send(err);
        else
            res.json(restaurants);
    });
};

module.exports.show = function(req, res) {
    Restaurant.findById(req.params._id, function(err, restaurant) {
        if (err)
            res.send(err);
        else
            res.json(restaurant);
    });
};

module.exports.update = function(req, res) {

    // use our restaurant model to find the restaurant we want
    Restaurant.findById(req.params._id, function(err, restaurant) {

        if (err)
            res.send(err);

        restaurant.name = req.body.name;  // update the bears info

        // save the restaurant
        restaurant.save(function(err) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Bear updated!' });
        });

    });
};

module.exports.store = function(req, res) {

    var restaurant = new Restaurant();      // create a new instance of the Restaurant model
    restaurant.name = req.body.name;  // set the restaurants name (comes from the request)
    restaurant.building = req.body.building;
    restaurant.coord = req.body.name;
    restaurant.name = req.body.name;
    restaurant.name = req.body.name;
    restaurant.name = req.body.name;

    // save the restaurant and check for errors
    restaurant.save(function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Restaurant created!' });
    });

};

module.exports.destroy = function(req, res) {
    Restaurant.remove({
        _id: req.params.bear_id
    }, function(err, bear) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Successfully deleted' });
    });
};