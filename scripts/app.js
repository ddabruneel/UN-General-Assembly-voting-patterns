'use strict';

angular.module('kura', [
  'ngRoute',
  'ngAnimate',
  'ngAria',
  'ngSanitize',
  'kura.directives',
  'kura.controllers',
  'mgcrea.ngStrap',
  'ui',
  // 'ui.bootstrap',
  'angular.filter' 
  // 'angularScreenfull',
  // 'smart-table'
])

.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html', 
        controller: 'KuraCtrl'
      })
      .otherwise({redirectTo: '/'});
}]);