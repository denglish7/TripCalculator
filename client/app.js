var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/main.html'
    })
    .when('/totals/:id', {
        templateUrl: 'partials/totals.html'
    })
    .otherwise({
        redirectTo: '/'
    })
})
