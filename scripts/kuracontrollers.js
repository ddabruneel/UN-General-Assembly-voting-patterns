'use strict';

/* Controllers */

angular.module('kura.controllers', [])

  .controller('KuraCtrl', ['$scope', '$http', '$window', function ($scope, $http, $window) {
      
    // Load finance look-ups
    // Schema Patterns File
 
      $scope.getKuraFile = function getKuraFile(str) {
   
       var PATH = 'data/';    
       d3.csv(PATH + str, function(data){
        return data;
        }, function(err, data){
        if(err){ throw err; }
        $scope.$apply(function(){
          $scope.KuraFile = data;
          //console.log(JSON.stringify(data));
        });
      });
    };
      
    $scope.getKuraFile("votingThemes.csv");
      
    
      
    

}])