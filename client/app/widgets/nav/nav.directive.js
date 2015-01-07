(function () {
  'use strict';
  angular.module('bfTools').directive('bfNav', navigationDirective);

  function navigationDirective() {
    return {
      restrict: 'AE',
      replace: 'true',
      scope: {
        config: '=bfNav'
      },
      templateUrl: '/app/widgets/nav/nav.template.html',
      link: link
    };

    //#region internal functions

    function link(scope, element, attributes, controller) {
      var config = scope.config;

      scope.nav = [];
      
      if (angular.isObject(config)) {
        // TODO: validate the config object before using it
        scope.nav = config;
      } else if (angular.isString(config)) {
        // TODO: validate scope.config against a URL regex before using $http
        $http.get(config).success(function (data) {
          scope.nav = data.nav;
        });
      }
    }

    //#endregion
  }
})();
