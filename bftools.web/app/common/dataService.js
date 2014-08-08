(function (app) {
  app.service('dataService', ['$resource', dataService]);

  function dataService($resource) {
    this.comics = $resource('comics.json');
  }
})(angular.module('bfTools'));