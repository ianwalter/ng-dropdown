/**
 * ng-dropdown - v1.0.2 - A simple AngularJS directive to provide dropdown menu
 * functionality!
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
'use strict';

(function (angular) {
  'use strict';

  angular.module('ng-dropdown', []).service('DropdownService', function () {

    this.dropdowns = [];

    this.open = function (id) {
      // console.log('open', id);
      var dropdown = this.dropdowns[id];
      dropdown.element.addClass(dropdown.activeClass);
      dropdown.menuElement.addClass(dropdown.openClass);
      dropdown.opened = true;
    };

    this.close = function (id) {
      // console.log('close', id);
      var dropdown = this.dropdowns[id];
      dropdown.element.removeClass(dropdown.activeClass);
      dropdown.menuElement.removeClass(dropdown.openClass);
      dropdown.opened = false;
    };

    this.toggle = function (id) {
      var dropdown = this.dropdowns[id];
      if (dropdown.opened) {
        this.close(id);
      } else {
        this.open(id);
      }
    };
  }).directive('dropdown', ['$document', '$parse', 'DropdownService', function ($document, $parse, DropdownService) {
    return {
      restrict: 'A',
      scope: {
        dropdown: '=?',
        disabled: '&dropdownDisabled',
        opened: '@'
      },
      link: function link($scope, element, attrs) {
        var dropdownField = element[0].querySelector('.ng-dropdown-field'),
            openClass = attrs.dropdownOpenClass || 'open',
            activeClass = attrs.dropdownActiveClass || 'active',
            options;
        $scope.opened = false;

        $scope.dropdown = { id: DropdownService.dropdowns.length };
        DropdownService.dropdowns[$scope.dropdown.id] = {
          activeClass: activeClass,
          openClass: openClass,
          element: element,
          menuElement: angular.element(document.getElementById(attrs.dropdownMenu))
        };

        $scope.$watch('disabled()', function (val) {
          if (val) {
            element.addClass('dropdown-disabled');
          } else {
            element.removeClass('dropdown-disabled');
          }
        });

        function open() {
          if (!$scope.opened) {
            $scope.$apply(function () {
              DropdownService.menuElement.addClass(openClass);
              DropdownService.element.addClass(activeClass);
              $scope.opened = true;

              var dropdown = DropdownService.dropdowns[$scope.dropdown];
              dropdown.opened = true;
            });
          }
        }

        function close() {
          $scope.$apply(function () {
            DropdownService.menuElement.removeClass(openClass);
            DropdownService.element.removeClass(activeClass);
            $scope.opened = false;

            var dropdown = DropdownService.dropdowns[$scope.dropdown];
            dropdown.opened = false;

            clearCurrentOption();
          });
        }

        function toggle() {
          if ($scope.opened) {
            close();
          } else {
            open();
          }
        }

        function getOptions() {
          return Array.prototype.map.call(DropdownService.menuElement.children(), function (option) {
            return option;
          });
        }

        function clearCurrentOption() {
          if ($scope.currentOption) {
            angular.element($scope.currentOption).removeClass(activeClass);
            delete $scope.currentOption;
          }
        }

        function nextOption() {
          open();
          if (!options) {
            options = getOptions();
            $scope.currentOption = options[0];
          } else {
            var index = options.indexOf($scope.currentOption) + 1;
            clearCurrentOption();
            $scope.currentOption = options.length > index ? options[index] : options[0];
          }
          angular.element($scope.currentOption).addClass(activeClass);

          DropdownService.menuElement[0].scrollTop = $scope.currentOption.offsetTop;
        }

        function previousOption() {
          open();
          if (!options) {
            options = getOptions();
            $scope.currentOption = options[0];
          } else {
            var index = options.indexOf($scope.currentOption) - 1;
            clearCurrentOption();
            $scope.currentOption = index >= 0 ? options[index] : options[options.length - 1];
          }
          angular.element($scope.currentOption).addClass(activeClass);

          DropdownService.menuElement[0].scrollTop = $scope.currentOption.offsetTop;
        }

        angular.element(document.getElementById(attrs.dropdownMenu)).bind('mouseenter', function () {
          clearCurrentOption();
        });

        element.bind('click', function (e) {
          if (!$scope.disabled()) {
            var openTarget = angular.element(document.getElementById(attrs.dropdownMenu));

            if (DropdownService.menuElement && DropdownService.menuElement.attr('id') !== openTarget.attr('id')) {
              close();
            }
            DropdownService.menuElement = openTarget;
            DropdownService.element = element;

            e.preventDefault();
            e.stopPropagation();

            toggle();
          }
        });

        $document.bind('keydown', function (e) {
          if (!$scope.disabled() && ($scope.opened || document.activeElement === dropdownField) && [9, 27, 40, 38, 13].indexOf(e.keyCode) !== -1) {

            DropdownService.element = element;
            DropdownService.menuElement = angular.element(document.getElementById(attrs.dropdownMenu));

            if (e.keyCode === 9) {
              // Tab
              close();
              return;
            } else {
              e.preventDefault();
              e.stopPropagation();
            }

            if (e.keyCode === 27) {
              // Escape
              close();
            } else if (e.keyCode === 40) {
              // Down
              nextOption();
            } else if (e.keyCode === 38) {
              // Up
              previousOption();
            } else if (e.keyCode === 13) {
              // Enter
              if ($scope.currentOption && $scope.opened && document.activeElement === dropdownField) {
                $scope.currentOption.click();
              } else if (!$scope.opened && document.activeElement === dropdownField) {
                open();
              }
            }
          }
        });

        $document.bind('click', function (e) {
          if ($scope.opened && e.target !== DropdownService.menuElement) {
            close();
          }
        });
      }
    };
  }]);
})(window.angular);