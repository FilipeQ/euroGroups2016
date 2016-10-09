(function() {
    var app = angular.module('groupsStore', []);

    app.controller('GroupsController', function($scope,$http) {
        $scope.title = "";
        $scope.tables = [];

        $http({
            method : "GET",
            headers: { 'X-Auth-Token': '293eb02126bd4780b14c49af3ff7c4a0' },
            url : "http://api.football-data.org/v1/soccerseasons/424/leagueTable"
        }).then(function mySucces(response) {
            $scope.title = response.data.leagueCaption;
            $scope.tables = response.data.standings;

        }, function myError(response) {
            console.log("Error load data:");
            console.log(response);
        });

    });

    app.directive("groupDescription", function(){
        return {
            restrict: 'E',
            templateUrl:'views/group-description.html'
        };
    });

    app.directive("menuNavegacao", function(){
        return {
            restrict: 'E',
            templateUrl:'views/menu-navegacao.html'
        };
    });

    app.filter('customFilterGroups', function() {
        return function(object, search) {

            if (!object) return object;
            if (!search) return object;

            var result = {};
            angular.forEach(object, function(value, key) {

                if(key === search[0].group){
                    result[key] = value;
                }
            });
            return result;
        }
    });

})();

