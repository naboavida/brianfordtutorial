'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'nvd3ChartDirectives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index',
        controller: HomeCtrl
      }).
      when('/projects', {
        templateUrl: 'projects',
        controller: ProjectsCtrl
      }).
      when('/addProject', {
        templateUrl: 'addProject',
        controller: AddProjectsCtrl
      }).
      // when('/addPost', {
      //   templateUrl: 'partials/addPost',
      //   controller: AddPostCtrl
      // }).
      // when('/readPost/:id', {
      //   templateUrl: 'partials/readPost',
      //   controller: ReadPostCtrl
      // }).
      // when('/editPost/:id', {
      //   templateUrl: 'partials/editPost',
      //   controller: EditPostCtrl
      // }).
      // when('/deletePost/:id', {
      //   templateUrl: 'partials/deletePost',
      //   controller: DeletePostCtrl
      // }).
      when('/project/innerDashboard', {
        templateUrl: 'partials/innerDashboard',
        controller: IndexCtrl
      }).
      when('/project', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/project/addPost', {
        templateUrl: 'partials/addPost',
        controller: AddPostCtrl
      }).
      when('/project/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/project/readPost2/:id', {
        templateUrl: 'partials/readPost2',
        controller: ReadPostCtrl2
      }).
      when('/project/readPost3/:id', {
        templateUrl: 'partials/readPost3',
        controller: ReadPostCtrl3
      }).
      when('/project/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/project/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      when('/project/activitiesDashboard/', {
        templateUrl: 'partials/activitiesDashboard',
        controller: ActivitiesCtrl
      }).
      when('/project/:pid', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/project/:pid/:id', {
        templateUrl: 'partials/index',
        controller: IndexCtrl
      }).
      when('/project/innerDashboard/:pid', {
        templateUrl: 'partials/innerDashboard',
        controller: IndexCtrl
      }).
      when('/project/innerDashboard/:pid/:id', {
        templateUrl: 'partials/innerDashboard',
        controller: IndexCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
