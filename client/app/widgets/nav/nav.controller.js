(function () {
  'use strict';
  angular.module('bfTools').controller('navigationController', navigationController);
  
  navigationController.$inject = ['$scope', '$location'];

  function navigationController($scope, $location) {
    var vm = this;
    
    vm.nav = [];
    vm.isActive = isActive;
    
    init();
    
    //#region internal functions
    
    function init() {
      var config = $scope.config;
      
      if (angular.isObject(config)) {
        // TODO: validate the config object before using it
        vm.nav = config;
      } else if (angular.isString(config)) {
        // TODO: validate scope.config against a URL regex before using $http
        $http.get(config).success(function (data) {
          vm.nav = data.nav;
        });
      }
    }
    
    function isActive(path) {
      return path === $location.path();
    }
    
    //#endregion
  }
})();