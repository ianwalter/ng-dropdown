/**
 * ng-dropdown - v0.0.1 - A simple AngularJS directive to provide dropdown menu functionality!
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
angular
  .module('ng-dropdown', [])
  .factory('DropdownService', function() {
    return {
      menuElement: null
    };
  })
  .directive('dropdown', ['$window', '$parse', 'DropdownService', function($window, $parse, DropdownService) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {

      }
    };
  }]);
