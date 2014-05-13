'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  });

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

function IndexCtrl($scope, $http, $routeParams) {
  var read_id = '/';
  console.log($routeParams);
  if(isEmpty($routeParams) == false ){
    read_id += $routeParams.id;
  }
  console.log('IndexCtrl /api/posts'+read_id);
  $http.get('/api/posts'+read_id).
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
      $scope.masterPosts = data.masterPosts;
      $scope.toSendIds = data.toSendIds;
      $scope.last_read_id = data.last_read_id;
      console.log("yeah IndexCtrl "+$scope.last_read_id);
      console.log($scope.posts);
    });
}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  console.log('AddPostCtrl /api/post');
  console.log($scope.form);
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      success(function(data) {
        console.log("yeah AddPostCtrl");
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  console.log("EditPostCtrl");
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.form = data.post;
      console.log(data.post);
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      success(function(data) {
        // $location.url('/readPost/' + $routeParams.id);
        // console.log("edit done:");
        // console.log( data + " " + typeof(data) + " " + parseInt(data) + " " + Number(data));
        $location.path('/'+data);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
    });

  $scope.deletePost = function () {
    $http.delete('/api/post/' + $routeParams.id).
      success(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}

// function GeoApiIndex($scope, $http, $routeParams){
//   console.log("lwlwllwlawa");
// }