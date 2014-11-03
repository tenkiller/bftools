(function () {
  'use strict';
  angular.module('bfTools').directive('bfGrid', gridDirective);

  function gridDirective() {
    return {
      restrict: 'A',
      replace: true,
      scope: {
        options: '=bfOptions'
      },
      templateUrl: 'app/grid/grid.template.html',
      controller: 'gridController',
      controllerAs: 'vm',
      link: link
    };

    function link(scope, element, attributes, controller) {
      var columns = scope.options.columns,
          colgroups = element.find('colgroup');

      // ng-repeat markup became too verbose and ugly, so this method was used to 
      // append <col/> elements to a <colgroup/> in each table
      angular.forEach(colgroups, function (colgroup) {
        for (var i = 0; i < columns.length; i++) {
          var colElement = angular.element('<col />');

          if (columns[i].width) {
            colElement.css('width', columns[i].width + 'px');
          }

          if (columns[i].hidden) {
            colElement.css('display', 'none');
          }

          angular.element(colgroup).append(colElement);
        }
      });
    }
  }
})();