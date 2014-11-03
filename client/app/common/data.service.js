(function () {
  'use strict';
  angular.module('bfTools').service('dataService', ['$resource', dataService]);

  function dataService($resource) {
    this.comics = $resource('comics.json');
  }
})();