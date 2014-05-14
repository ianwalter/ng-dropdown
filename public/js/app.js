/**
 * Example application for ng-timer (https://github.com/ianwalter/ng-timer)
 *
 * @author Ian Kennington Walter (http://ianvonwalter.com)
 */
requirejs.config({
  baseUrl: '.',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular.min',
      'public/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.2.4/angular-route.min',
      'public/lib/angular-route/angular-route.min'
    ],
    'ng-dropdown': [
      'dist/js/ng-dropdown'
    ]
  },
  shim: {
    'angular' : { 'exports' : 'angular' },
    'angular-route': { deps:['angular'] },
    'ng-dropdown': { deps:['angular'] }
  }
});

require(['angular', 'angular-route', 'ng-dropdown'], function(angular) {
  "use strict";

  var app = angular.module('menu-demo', ['ngRoute', 'ng-dropdown'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', { controller: 'HomeController', templateUrl: 'public/template/home.html', label: 'Home' })
        .otherwise({ redirectTo: '/' });
    }]);

  app.controller('HomeController', [
    '$scope',
    function($scope) {
      $scope.options = [
        'Option 1',
        'Option 2',
        'Option 3'
      ];

      $scope.optionsTwo = [
        'Cat Rider',
        'Klapp Klapp',
        'Pretty Girls',
        'Paris',
        'Only One',
        'Ritual Union',
        'Little Man',
        'Shuffle A Dream',
        'Crystalfilm',
        'Precious',
        'Summertearz',
        'Twice',
        'Recommendation',
        'Forever',
        'After The Rain',
        'Wink'
      ];

      $scope.selected = {
        one: $scope.options[0],
        two: $scope.optionsTwo[0]
      };
    }
  ]);

  angular.bootstrap(document , ['menu-demo']);
});
