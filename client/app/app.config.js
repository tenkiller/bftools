(function () {
  'use strict';
  angular.module('bfTools').config(moduleConfig);

  moduleConfig.$inject = ['$routeProvider', '$locationProvider'];
  
  function moduleConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  }
})();