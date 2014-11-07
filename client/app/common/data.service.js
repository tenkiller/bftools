(function () {
  'use strict';
  angular.module('bfTools').service('dataService', dataService);

  dataService.$inject = ['$resource'];

  function dataService($resource) {
    this.comics = $resource('/api/comics');
  }
})();