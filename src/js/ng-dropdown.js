/**
 * ng-dropdown - v0.0.7 - A simple AngularJS directive to provide dropdown menu functionality!
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
angular
  .module('ng-dropdown', [])
  .factory('DropdownService', function() {
    return {
      element: null,
      menuElement: null
    };
  })
  .directive('dropdown', ['$document', '$parse', 'DropdownService', function($document, $parse, DropdownService) {
    return {
      restrict: 'A',
      scope: {
        opened: '@'
      },
      link: function($scope, element, attrs) {
        var disabled = $scope.$eval(attrs.dropdownDisabled),
          openTarget,
          openClass = attrs.dropdownOpenClass || 'open',
          optionClass = attrs.dropdownOptionClass || 'option',
          activeClass = attrs.dropdownActiveClass || 'active';
        $scope.opened = false;

        function open() {
          $scope.$apply(function() {
            DropdownService.menuElement.addClass(openClass);
            DropdownService.element.addClass(activeClass);
            $scope.opened = true;
          });
        }

        function close() {
          $scope.$apply(function() {
            DropdownService.menuElement.removeClass(openClass);
            DropdownService.element.removeClass(activeClass);
            $scope.opened = false;
          });
        }

        function toggle() {
          if ($scope.opened) {
            close();
          } else {
            open();
          }
        }

        element.bind('click', function(event) {
          if (!disabled) {
            openTarget = angular.element(document.getElementById(attrs.dropdownMenu));

            if (DropdownService.menuElement && DropdownService.menuElement.attr('id') !== openTarget.attr('id')) {
              close();
            }
            DropdownService.menuElement = openTarget;
            DropdownService.element = element;

            event.preventDefault();
            event.stopPropagation();

            toggle();
          }
        });

        $document.bind('keyup', function(event) {
          if (!disabled && $scope.opened) {
            if (event.keyCode === 27) { // Escape
              close();
            } else if (event.keyCode === 40) { // Down

            } else if (event.keyCode === 38) { // Up

            } else if (event.keyCode === 13) { // Enter

            }
          }
        });

        $document.bind('click', function() {
          if ($scope.opened && event.target !== openTarget) {
            close();
          }
        });
      }
    };
  }]);