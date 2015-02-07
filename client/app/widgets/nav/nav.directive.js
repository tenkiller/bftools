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
      controller: 'navigationController',
      controllerAs: 'vm',
      link: link
    };

    //#region internal functions

    function link(scope, element, attributes, controller) {
      
    }

    //#endregion
  }
})();