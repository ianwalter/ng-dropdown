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
      'dist/ng-dropdown'
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

    }
  ]);

  angular.bootstrap(document , ['menu-demo']);
});
