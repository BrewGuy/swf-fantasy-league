//define app
var app = angular.module('league', []);

app.controller('getResults', function($scope, $http) {
  $http.get("/json/swfdata.json")
  .then(function(response) {
      $scope.swfData = response.data.fantasyleague;
  });
});