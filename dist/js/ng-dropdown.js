/**
 * ng-dropdown - v0.1.0 - A simple AngularJS directive to provide dropdown menu functionality!
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
        disabled: '&dropdownDisabled',
        opened: '@'
      },
      link: function($scope, element, attrs) {
        var dropdownField = element[0].querySelector('.ng-dropdown-field'),
            openClass = attrs.dropdownOpenClass || 'open',
            optionClass = attrs.dropdownOptionClass || 'option', // TODO will be used when scrolling options implemented
            activeClass = attrs.dropdownActiveClass || 'active';
        $scope.opened = false;

        $scope.$watch('disabled()', function(val) {
          if (val) {
            element.addClass('dropdown-disabled');
          } else {
            element.removeClass('dropdown-disabled');
          }
        });

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
          if (!$scope.disabled()) {
            var openTarget = angular.element(document.getElementById(attrs.dropdownMenu));

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
          if (!$scope.disabled() && ($scope.opened || document.activeElement === dropdownField)) {
            if (event.keyCode === 27 || event.keyCode === 9) { // Escape or Tab
              close();
            } else if (event.keyCode === 40) { // Down
              //nextOption();
            } else if (event.keyCode === 38) { // Up
              //previousOption();
            } else if (event.keyCode === 13) { // Enter
              if (document.activeElement === dropdownField) {
                DropdownService.element = element;
                DropdownService.menuElement = angular.element(document.getElementById(attrs.dropdownMenu));
                open();
              }
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
