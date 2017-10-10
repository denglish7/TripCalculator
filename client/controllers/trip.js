app.controller('tripController', function($scope, tripFactory, $routeParams){
    $scope.p1expenses = [];
    $scope.p2expenses = [];
    $scope.p3expenses = [];

    $scope.addExpenseP1 = function (){
        $scope.errors = [];
        if(!$scope.person1 || !$scope.person1.name){
            $scope.errors.push("Please enter a name");
        } else if (!$scope.person1.expense){
            $scope.errors.push("Please enter an expense");
        } else {
            $scope.p1expenses.push($scope.person1.expense);
            $scope.person1.total = 0;
            for (var i = 0; i < $scope.p1expenses.length; i++) {
                if($scope.p1expenses[i] !== undefined){
                    $scope.person1.total += parseFloat($scope.p1expenses[i]);
                }
            }
            $scope.person1.expense = '';
        }
    }

    $scope.addExpenseP2 = function (){
        $scope.errors = [];
        if(!$scope.person2 || !$scope.person2.name){
            $scope.errors.push("Please enter a name");
        } else if (!$scope.person2.expense){
            $scope.errors.push("Please enter an expense");
        } else {
            $scope.p2expenses.push($scope.person2.expense);
            $scope.person2.total = 0;
            for (var i = 0; i < $scope.p2expenses.length; i++) {
                if($scope.p2expenses[i] !== undefined){
                    $scope.person2.total += parseFloat($scope.p2expenses[i]);
                }
            }
            $scope.person2.expense = '';
        }
    }

    $scope.addExpenseP3 = function (){
        $scope.errors = [];
        if(!$scope.person3 || !$scope.person3.name){
            $scope.errors.push("Please enter a name");
        } else if (!$scope.person3.expense){
            $scope.errors.push("Please enter an expense");
        } else {
            $scope.p3expenses.push($scope.person3.expense);
            $scope.person3.total = 0;
            for (var i = 0; i < $scope.p3expenses.length; i++) {
                if($scope.p3expenses[i] !== undefined){
                    $scope.person3.total += parseFloat($scope.p3expenses[i]);
                }
            }
            $scope.person3.expense = '';
        }
    }

    $scope.submit = function(){
        $scope.errors = [];
        if(!$scope.person1 || !$scope.person1.name || !$scope.person2 || !$scope.person2.name || !$scope.person3 || !$scope.person3.name){
            $scope.errors.push("Please enter 3 names")
        } else {
            $scope.trip = {};
            $scope.trip.total = parseFloat($scope.person1.total + $scope.person2.total + $scope.person3.total);
            $scope.trip.people = [$scope.person1, $scope.person2, $scope.person3];
            tripFactory.logTrip($scope.trip)
        }
    }

    if($routeParams.id){
        tripFactory.getTripData(function(data){
            $scope.trips = data;
            for(trip in $scope.trips){
                if($scope.trips[trip]['_id'] == $routeParams.id){
                    $scope.cur_trip = $scope.trips[trip];
                    $scope.calculate($scope.cur_trip);
                }
            }
        })
    }

    $scope.calculate = function(trip){
        $scope.total = Math.round(100*trip.total)/100;
        $scope.avg = trip.total/3;
        $scope.highestSpender = trip.people[trip.people.length-1];
        for (var i = trip.people.length-2; i >= 0; i--){
            if(trip.people[i].total > $scope.highestSpender.total){
                var temp = trip.people[i];
                trip.people[i] = trip.people[trip.people.length-1];
                trip.people[trip.people.length-1] = temp;
            }
        }
        $scope.highestSpender = trip.people.pop();
        for (var i = 0; i < trip.people.length; i++) {
            trip.people[i].owes = Math.round(100*($scope.avg - trip.people[i].total))/100;
        }
        $scope.people = trip.people;
    }
})
