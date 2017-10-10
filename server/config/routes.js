var trip = require('./../controllers/trip.js');

module.exports = function(app){
    app.post('/trip/add', function(req, res){
        trip.submit(req, res);
    })
    app.get('/trip/getTripData', function(req, res){
        trip.getTripData(req, res);
    })
}
