(function () {
  'use strict';
  angular.module('bfTools').directive('bfDelegate', delegateDirective);

  delegateDirective.$inject = ['$parse'];
  
  function delegateDirective($parse) {
    return {
      restrict: 'A',
      scope: {
        options: '=bfDelegate'
      },
      link: link
    };

    function link(scope, element) {
      var trigger, selector, action;

      trigger = scope.options.trigger;
      selector = scope.options.selector;
      action = $parse(scope.options.action);

      element.on(trigger, function (e) {
        var targetNode, targetScope;

        targetNode = getTargetNode(element[0], e.target, selector);

        if (targetNode) {
          targetScope = angular.element(targetNode).scope();

          targetScope.$apply(function () {
            action(targetScope);
          });
        }
      });
    }

    function getTargetNode(parent, child, selector) {
      if (!parent || !child) {
        return null;
      }

      if (!selector) {
        return child;
      }

      if (parent === child) {
        // we traversed all the way up to the parent node, so return
        // null since the selector does not exist as a child
        return null;
      }

      // we cannot trust that child.nodeName is uppercase, by default, 
      // so we make sure it is before doing the comparison
      if (child.nodeName.toUpperCase() === selector.toUpperCase()) {
        return child;
      }

      return getTargetNode(parent, child.parentNode, selector);
    }
  }
})();