var mongoose = require('mongoose');
var Trip = mongoose.model('Trip');

module.exports = (function(){
    return{
        submit: function(req, res){
            var trip = new Trip(req.body);
            trip.save(function(err, trip){
                if(err){
                    res.json(err);
                } else {
                    res.json(trip);
                }
            })
        },
        getTripData: function(req, res){
            Trip.find({}, function(err, data){
                res.json(data);
            })
        }
    }
})()
