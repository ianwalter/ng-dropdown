/**
 * ng-dropdown - v2.0.1 - A simple AngularJS directive to provide dropdown menu
 * functionality!
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
'use strict';

(function (angular) {
  'use strict';

  angular.module('ng-dropdown', []).service('DropdownService', ['$document', function ($document) {
    var _this5 = this;

    this.dropdowns = [];

    this.open = function (id) {
      var _this = this;

      /// console.log('open', id);
      var dropdown = this.dropdowns[id];
      if (!dropdown.opened) {
        if (this.currentlyOpen || this.currentlyOpen === 0) {
          this.close(this.currentlyOpen);
        }

        dropdown.element.addClass(dropdown.activeClass);
        dropdown.menuElement.addClass(dropdown.openClass);
        dropdown.opened = true;

        // Prevent immediate open-close from toggle button
        setTimeout(function () {
          return _this.currentlyOpen = id;
        }, 0);
      }
    };

    this.close = function (id) {
      // console.log('close', id);
      var dropdown = this.dropdowns[id];
      if (dropdown.opened) {
        dropdown.element.removeClass(dropdown.activeClass);
        dropdown.menuElement.removeClass(dropdown.openClass);
        dropdown.opened = false;

        delete this.currentlyOpen;
        delete dropdown.options;
        this.clearCurrentOption(dropdown);
      }
    };

    this.disable = function (id) {
      var dropdown = this.dropdowns[id];
      dropdown.element.addClass('dropdown-disabled');
      dropdown.disabled = true;
    };

    this.enable = function (id) {
      var dropdown = this.dropdowns[id];
      dropdown.element.removeClass('dropdown-disabled');
      dropdown.disabled = false;
    };

    this.toggle = function (id) {
      var dropdown = this.dropdowns[id];
      if (dropdown.opened) {
        this.close(id);
      } else {
        this.open(id);
      }
    };

    this.documentClickHandler = function () {
      var _this2 = this;

      return function ($event) {
        if (_this2.currentlyOpen || _this2.currentlyOpen === 0) {
          var currentDropdown = _this2.dropdowns[_this2.currentlyOpen];
          if (currentDropdown.menuElement !== $event.target && !currentDropdown.disableDocumentClick) {
            _this2.close(_this2.currentlyOpen);
          }
        }
      };
    };

    $document.bind('click', this.documentClickHandler());

    this.clickHandler = function (dropdown) {
      var _this3 = this;

      return function ($event) {
        if (!dropdown.disabled && !dropdown.disableClick) {
          _this3.toggle(dropdown.id);
        }
      };
    };

    this.focusHandler = function (dropdown) {
      var _this4 = this;

      return function () {
        return _this4.currentlyFocused = dropdown;
      };
    };

    this.blurHandler = function () {
      return delete _this5.currentlyFocused;
    };

    this.clearCurrentOption = function (dropdown) {
      if (dropdown.currentOption) {
        dropdown.currentOption.removeClass(dropdown.activeClass);
        delete dropdown.currentOption;
      }
    };

    this.mouseenterHandler = function (dropdown) {
      var _this6 = this;

      return function () {
        _this6.clearCurrentOption(dropdown);
        dropdown.isInsideMenu = true;
      };
    };

    this.mouseleaveHandler = function (dropdown) {
      return function () {
        return dropdown.isInsideMenu = false;
      };
    };

    this.populateOptions = function (dropdown) {
      dropdown.options = Array.prototype.map.call(dropdown.menuElement.children(), function (option) {
        return angular.element(option);
      });
      dropdown.currentOption = angular.element(dropdown.options[0]);
    };

    this.activateNextOption = function (dropdown) {
      this.open(dropdown.id);
      if (!dropdown.options) {
        this.populateOptions(dropdown);
      } else {
        var index = dropdown.options.indexOf(dropdown.currentOption) + 1;
        this.clearCurrentOption(dropdown);
        dropdown.currentOption = dropdown.options.length > index ? dropdown.options[index] : dropdown.options[0];
      }
      dropdown.currentOption.addClass(dropdown.activeClass);
      dropdown.menuElement[0].scrollTop = dropdown.currentOption.offsetTop;
    };

    this.activatePreviousOption = function (dropdown) {
      this.open(dropdown.id);
      if (!dropdown.options) {
        this.populateOptions(dropdown);
      } else {
        var index = dropdown.options.indexOf(dropdown.currentOption) - 1;
        this.clearCurrentOption(dropdown);
        dropdown.currentOption = index >= 0 ? dropdown.options[index] : dropdown.options[dropdown.options.length - 1];
      }
      dropdown.currentOption.addClass(dropdown.activeClass);
      dropdown.menuElement[0].scrollTop = dropdown.currentOption.offsetTop;
    };

    this.keyupHandler = function (dropdown) {
      var _this7 = this;

      return function ($event) {
        var isActive = document.activeElement === dropdown.fieldElement[0];

        if (!dropdown.disabled && (dropdown.opened || isActive) && [9, 27, 40, 38, 13].indexOf($event.keyCode) !== -1) {

          $event.preventDefault();
          $event.stopPropagation();

          if ($event.keyCode === 27) {
            // Escape
            _this7.close(dropdown.id);
          } else if ($event.keyCode === 40) {
            // Down
            _this7.activateNextOption(dropdown);
          } else if ($event.keyCode === 38) {
            // Up
            _this7.activatePreviousOption(dropdown);
          } else if ($event.keyCode === 13) {
            // Enter
            if (dropdown.currentOption && dropdown.opened && isActive) {
              dropdown.currentOption[0].click();
            } else if (!dropdown.opened && isActive) {
              _this7.open(dropdown.id);
            }
          }
        }
      };
    };

    this.keydownHandler = function (dropdown) {
      var _this8 = this;

      return function ($event) {
        if (dropdown.opened && $event.keyCode === 9) {
          // Tab
          _this8.close(dropdown.id);
        }
      };
    };
  }]).directive('dropdown', ['$parse', 'DropdownService', function ($parse, DropdownService) {
    return {
      restrict: 'A',
      scope: {
        dropdown: '=?',
        disabled: '=?dropdownDisabled'
      },
      link: function link($scope, element, attrs) {
        var openClass = attrs.dropdownOpenClass || 'open',
            activeClass = attrs.dropdownActiveClass || 'active',
            dropdownMenu = element[0].querySelector('[dropdown-menu]'),
            dropdownField = element[0].querySelector('[dropdown-field]'),
            dropdown;

        dropdown = {
          id: DropdownService.dropdowns.length,
          activeClass: activeClass,
          openClass: openClass,
          element: element,
          fieldElement: angular.element(dropdownField),
          menuElement: angular.element(dropdownMenu)
        };

        $scope.dropdown = DropdownService.dropdowns[dropdown.id] = dropdown;

        $scope.$watch('disabled', function (disabled) {
          if (disabled) {
            DropdownService.disable(dropdown.id);
          } else {
            DropdownService.enable(dropdown.id);
          }
        });

        element.bind('click', DropdownService.clickHandler(dropdown));

        element.bind('focus', DropdownService.focusHandler(dropdown));

        element.bind('blur', DropdownService.blurHandler);

        dropdown.menuElement.bind('mouseenter', DropdownService.mouseenterHandler(dropdown));

        dropdown.menuElement.bind('mouseleave', DropdownService.mouseleaveHandler(dropdown));

        dropdown.fieldElement.bind('keyup', DropdownService.keyupHandler(dropdown));

        dropdown.fieldElement.bind('keydown', DropdownService.keydownHandler(dropdown));
      }
    };
  }]);
})(window.angular);