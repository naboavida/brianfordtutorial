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
  console.log("START INDEX");
  console.log($routeParams);
  console.log('IndexCtrl pid:'+$routeParams.pid);

  $scope.nextActivity = {name:'Water Sampling', day:'25', month:'September', year:'2014'};
  if(isEmpty($routeParams) == false &&  $routeParams.id!=undefined){
    read_id += $routeParams.id;
  }
  console.log('IndexCtrl /api/posts'+read_id);
  $http.get('/api/posts'+read_id).
    success(function(data, status, headers, config) {
      $scope.posts = data.posts;
      $scope.masterPosts = data.masterPosts;
      $scope.toSendIds = data.toSendIds;
      $scope.last_read_id = data.last_read_id;
      // $scope.project_info = data.project_info[0];
      console.log("yeah IndexCtrl ");
      // console.log($scope.project_info);
      // console.log($scope.posts);
    });

  WeatherCtrl($scope, $http);
}

function ProjectsCtrl($scope, $http){
  console.log("get all projects");
  // $scope.projects = [ {id:0, name:'São Tomé'}, {id:1, name:'Príncipe'} ];
  $http.get('/api/posts').
    success(function(data, status, headers, config) {
      $scope.projects = data.project_info;
      console.log($scope.projects);
  });
}

function AddProjectsCtrl($scope, $rootScope, $http, $location) {
  console.log("add project");
  $scope.formProject = {};
  console.log($scope.form);
  $scope.submitProject = function () {
    $http.post('/api/project', $scope.formProject).
      success(function(data) {
        console.log("yeah AddProjectController!");
        $location.path('/projects');
      });
  };
  // $scope.projects = [ {id:0, name:'São Tomé'}, {id:1, name:'Príncipe'} ];
  // $http.get('/api/posts').
  //   success(function(data, status, headers, config) {
  //     $scope.projects = data.project_info;
  //     console.log($scope.projects);
  // });
}

function WeatherCtrl($scope, $http){
  // $scope.weatherData = [ {name:'rh',value:'1'}, {name:'UV',value:'1'}, {name:'precip_today_metric',value:'1'}];
  $scope.weatherData = [];
  console.log($scope.weatherData);

  $http.get('http://api.wunderground.com/api/fd6f92441a1e3d84/conditions/q/CV/Praia.json').
    success(function(data){
      console.log('getting weather data');
      $scope.weatherData = [];
      // console.log(data.current_observation.relative_humidity);

      var obj = {name:'Relative Humidity', value:data.current_observation.relative_humidity};
      $scope.weatherData.push(obj);
      var obj = {name:'UV', value:data.current_observation.UV};
      $scope.weatherData.push(obj);
      var obj = {name:'Precipitation', value:data.current_observation.precip_today_metric, unit:'mm/h', iconSrc:('http://icons.wxug.com/i/c/k/'+data.current_observation.icon+'.gif')};
      $scope.weatherData.push(obj);
      // $scope.weatherData['rh'] = data.current_observation.relative_humidity;
      // $scope.weatherData['UV'] = data.current_observation.UV;
      // $scope.weatherData['precip_today_metric'] = data.current_observation.precip_today_metric;
      
      console.log($scope.weatherData);
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
        $location.path('/project/innerDashboard');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
      $scope.postId = $routeParams.id;
    });
}

function ReadPostCtrl2($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
      $scope.postId = $routeParams.id;
    });
}

function ReadPostCtrl3($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
      $scope.post = data.post;
      $scope.postId = $routeParams.id;
      $scope.activities = [{ name:"Reflorestação", date:"Fevereiro 2013"}, { name:"Limpeza", date:"Agosto 2013"} ];
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
        $location.path('/project/innerDashboard/0/'+data);
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
        $location.url('/project/innerDashboard');
      });
  };

  $scope.home = function () {
    console.log("home function")
    $location.url('/');
  };
}

function ExampleCtrl($scope){
  $scope.exampleData = [
    {
        "key": "Series 1",
        "values": [ [ 0 , 7] , [ 1 , 7.2] , [ 2 , 7.5] , [ 3 , 7.2] , [ 4 , 7.6], [ 5 , 7] , [ 6 , 7.2] , [ 7 , 7.5] , [ 8 , 7.2] , [ 9 , 7.6], [ 10 , 7] ]
    }
  ];
}


function HomeCtrl($scope, $location){
  console.log("home ctrl")
  $location.url('/');
}

function BulletCtrl($scope){
    $scope.bulletData =  {
        "ranges": [1, 180, 300],
        "measures": [70],
        "markers": [100]
    };

    $scope.bulletDataRead = {
      "ranges": [1, 3, 5],
      "measures": [3.5],
      "markers": [4.7]
    };
    // $scope.bulletData1 = {
    //     "ranges": [1, 180, 300],
    //     "measures": [70],
    //     "markers": [100]
    // };

    // $scope.bulletData2 = {
    //     "ranges": [1, 180, 300],
    //     "measures": [70],
    //     "markers": [100]
    // };

    // $scope.bulletDataAll[
    //   $scope.bulletData1,
    //   $scope.bulletData2
    // ];
}


// function GeoApiIndex($scope, $http, $routeParams){
//   console.log("lwlwllwlawa");
// }

function ActivitiesCtrl($scope, $http){
  console.log('ActivitiesCtrl');
}