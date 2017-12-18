var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/test/restaurants:27017');

var Restaurant = require('../models/restaurant');


module.exports.index = function(req, res) {
    Restaurant.find().limit(100).exec(function(err, restaurants) {
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

        restaurant.name = req.body.name;  // update the restaurant info

        // save the restaurant
        restaurant.save(function(err) {
            if (err)
                res.send(err);
            else
                res.json({ message: 'Restaurant updated!' });
        });

    });
};

module.exports.store = function(req, res) {

    var grade = {grade: req.body.grade, date: {type: Date, default: Date.now()}, score: req.body.score};
    const grades = [grade];
    grades.push(grade);
    var restaurant = new Restaurant({
        address:{
            building: req.body.building,
            coord: req.body.coord.castToNumber,
            street: req.body.street,
            zipcode: req.body.zipcode
        },
        borough: req.body.borough,
        cuisine: req.body.cuisine,
        grades: [grades],
        name: req.body.name,
        restaurant_id: req.body.restaurant_id

    });      // create a new instance of the Restaurant model
    // restaurant.name = req.body.name;  // set the restaurants name (comes from the request)
    // restaurant.address = req.body.address;
    // restaurant.borough = req.body.borough;
    // restaurant.cuisine = req.body.cuisine;
    // restaurant.grades = req.body.grades;
    // restaurant.restaurant_id = req.body.restaurant_id;

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
        _id: req.params._id
    }, function(err, restaurant) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Successfully deleted' });
    });
};