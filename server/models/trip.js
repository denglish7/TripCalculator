var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
    total: {type: String},
    people: []
})

mongoose.model('Trip', TripSchema)
