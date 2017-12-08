var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RestaurantSchema = new Schema({
    address: {
        building: String,
        coord: {type: [Number], min: -180, max: 180},
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: {type: Date, default: Date.now},
        grade: String,
        score: Number
    }],
    name: String,
    restaurant_id: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);