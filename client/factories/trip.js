app.factory('tripFactory', function($http, $route, $location){
    var factory = {};
    factory.logTrip = function(trip){
        $http.post('/trip/add', trip).then(function(output){
            $location.url('/totals/' + output.data._id);
        })
    }
    factory.getTripData = function(cb){
        $http.get('/trip/getTripData').then(function(output){
            cb(output.data);
        })
    }
    return factory;
})
