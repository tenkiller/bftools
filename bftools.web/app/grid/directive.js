(function (app) {
  app.directive('bfGrid', gridDirective);

  function gridDirective() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: '=bfOptions'
      },
      templateUrl: '/app/grid/template.html',
      controller: 'gridController',
      controllerAs: 'vm',
      link: link
    };

    function link(scope, element, attributes, controller) {
      // ...
    }
  }
})(angular.module('bfTools'));