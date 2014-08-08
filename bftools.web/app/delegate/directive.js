(function (app) {
  app.directive('bfDelegate', ['$parse', delegateDirective]);

  function delegateDirective($parse) {
    return {
      restrict: 'A',
      scope: {
        selector: '='
      },
      link: link
    };

    function link(scope, element, attributes) {
      var selector = attributes.bfSelector,
          expression = attributes.bfDelegate,
          expressionHandler = $parse(expression);

      element.on('click', function (e) {
        var targetNode, targetScope;

        targetNode = getTargetNode(element[0], e.target, selector);

        if (targetNode) {
          targetScope = angular.element(targetNode).scope();

          targetScope.$apply(function () {
            expressionHandler(targetScope);
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
        // we traveresed all the way up to the parent node, so return
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
})(angular.module('bfTools'));