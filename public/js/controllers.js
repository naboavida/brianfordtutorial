'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('AppCtrl', function($scope, $http) {

  $http({
    method: 'GET',
    url: '/api/name'
  }).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!';
  });

}).
controller('MyCtrl1', function($scope) {
  // write Ctrl here

}).
controller('MyCtrl2', function($scope) {
  // write Ctrl here

});

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
}

function IndexCtrl($scope, $http, $routeParams) {
  var read_id = '/';
  console.log("START INDEX");
  console.log($routeParams);
  console.log('IndexCtrl pid:' + $routeParams.pid);

  
  if (isEmpty($routeParams) == false && $routeParams.id != undefined) {
    read_id += $routeParams.id;
  }
  console.log('IndexCtrl /api/posts' + read_id);
  $http.get('/api/posts' + read_id).
  success(function(data, status, headers, config) {
    $scope.posts = data.posts;
    $scope.masterPosts = data.masterPosts;
    $scope.toSendIds = data.toSendIds;
    $scope.last_read_id = data.last_read_id;
    $scope.postsOverview = data.postsOverview;
    // $scope.project_info = data.project_info[0];
    console.log("yeah IndexCtrl ");
    // console.log($scope.postsOverview);
    // console.log($scope.posts);
  });

  WeatherCtrl($scope, $http);
}

function ProjectsCtrl($scope, $http) {
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
  $scope.submitProject = function() {
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

function WeatherCtrl($scope, $http) {
  // $scope.weatherData = [ {name:'rh',value:'1'}, {name:'UV',value:'1'}, {name:'precip_today_metric',value:'1'}];
  $scope.weatherData = [];
  console.log($scope.weatherData);

  var obj = {
    name: 'Relative Humidity',
    value: "44%"
  };
  $scope.weatherData.push(obj);
  var obj = {
    name: 'UV',
    value: "3"
  };
  $scope.weatherData.push(obj);
  var obj = {
    name: 'Precipitation',
    value: "0.1",
    unit: 'mm/h',
    iconSrc: ('http://icons.wxug.com/i/c/k/cloudy.gif')
  };
  $scope.weatherData.push(obj);

  // $http.get('http://api.wunderground.com/api/fd6f92441a1e3d84/conditions/q/CV/Praia.json').
  // success(function(data) {
  //   console.log('getting weather data');
  //   $scope.weatherData = [];
  //   // console.log(data.current_observation.relative_humidity);

  //   var obj = {
  //     name: 'Relative Humidity',
  //     value: data.current_observation.relative_humidity
  //   };
  //   $scope.weatherData.push(obj);
  //   var obj = {
  //     name: 'UV',
  //     value: data.current_observation.UV
  //   };
  //   $scope.weatherData.push(obj);
  //   var obj = {
  //     name: 'Precipitation',
  //     value: data.current_observation.precip_today_metric,
  //     unit: 'mm/h',
  //     iconSrc: ('http://icons.wxug.com/i/c/k/' + data.current_observation.icon + '.gif')
  //   };
  //   $scope.weatherData.push(obj);
  //   // $scope.weatherData['rh'] = data.current_observation.relative_humidity;
  //   // $scope.weatherData['UV'] = data.current_observation.UV;
  //   // $scope.weatherData['precip_today_metric'] = data.current_observation.precip_today_metric;

  //   console.log($scope.weatherData);
  // });

}

function AddPostCtrl($scope, $http, $location) {
  $scope.form = {};
  console.log('AddPostCtrl /api/post');
  console.log($scope.form);
  $scope.submitPost = function() {
    console.log('AddPostCtrl submit /api/post');
    console.log($scope.form);
    $http.post('/api/post', $scope.form).
    success(function(data) {
      console.log("yeah AddPostCtrl");
      $location.path('/project/index');
    });
  };

  $scope.submitInnerPost = function() {
    console.log('AddPostCtrl submitInnerPost /api/post');
    console.log($scope.form);
    $http.post('/api/postInner', $scope.form).
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
    $scope.activities = [{
      name: "Reflorestação",
      date: "Fevereiro 2013"
    }, {
      name: "Limpeza",
      date: "Agosto 2013"
    }];
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

  $scope.editPost = function() {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
    success(function(data) {
      // $location.url('/readPost/' + $routeParams.id);
      // console.log("edit done:");
      // console.log( data + " " + typeof(data) + " " + parseInt(data) + " " + Number(data));
      $location.path('/project/innerDashboard/0/' + data);
    });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
  success(function(data) {
    $scope.post = data.post;
  });

  $scope.deletePost = function() {
    $http.delete('/api/post/' + $routeParams.id).
    success(function(data) {
      $location.url('/project/innerDashboard');
    });
  };

  $scope.home = function() {
    console.log("home function")
    $location.url('/');
  };
}

function ExampleCtrl($scope) {
  $scope.exampleData = [{
    "key": "Series 1",
    "values": [
      [0, 7],
      [1, 7.2],
      [2, 7.5],
      [3, 7.2],
      [4, 7.6],
      [5, 7],
      [6, 7.2],
      [7, 7.5],
      [8, 7.2],
      [9, 7.6],
      [10, 7]
    ]
  }];
}


function HomeCtrl($scope, $location) {
  console.log("home ctrl")
  $location.url('/');
}

function BulletCtrl($scope) {
  $scope.bulletData = {
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

function ActivitiesCtrl($scope, $http) {
  console.log('ActivitiesCtrl');
}

function CalendarCtrl($scope, $http) {


    // $scope.nextActivity = {
    //   name: 'Water Sampling',
    //   day: '24',
    //   month: 'May',
    //   year: '2014'
    // };

    // read from api
    $http.get('/api/nextActivity/').
      success(function(data) {
        console.log("data is ");
        console.log(data.nextActivity);
        $scope.nextActivity = data.nextActivity;
        $scope.nextStart = data.nextStart;
        console.log("NEXT ACTIVITYYYYYYYY:");
        console.log($scope.nextStart);
        console.log($scope.events[0].start);
        $scope.events[0].start = $scope.nextStart;
      });
  

  

  $scope.alertOnDrop = function(elem){
    console.log("dropped event");
    console.log("nextActivity:");
    console.log($scope.nextActivity);
    // console.log(elem);
    // console.log( elem.start );
    // console.log( typeof(elem.start) );
    // for(var p in (elem.start) ){
    //   if ((elem.start).hasOwnProperty(p) ) {
    //     console.log(p + " " + elem.start[p]);
    //   }
    // };
    var dateDropped = new Date(elem.start);
    // console.log(dateDropped.getDate());
    var nextActivity = { name: 'Water Sampling', day: String(dateDropped.getDate()), month: 'May', year: '2014' };
    var togo = {'nextActivity':nextActivity, 'nextStart':elem.start}

    $http.post('/api/nextActivity/', togo).
      success(function(data) {
        console.log("yeah postNextActivity!");
        // $location.path('/projects');
      });

    console.log("nextActivity:");
    console.log($scope.nextActivity);
  };

  $scope.alertDayClick = function(date, allDay, jsEvent, view){
    if (allDay) {
        console.log('Clicked on the entire day: ' + date);
    }else{
        console.log('Clicked on the slot: ' + date);
    }
    $scope.events.push({title:$scope.activityToAdd, start:date});
    console.log($scope.events);
  };

  $scope.activityToAdd = '';

  $scope.uiConfig = {
    calendar: {
      height: 450,
      editable: true,
      header: {
        // left: 'month basicWeek basicDay agendaWeek agendaDay',
        left: 'agendaDay agendaWeek month',
        center: 'title',
        right: 'today prev,next'
      },
      dayClick: $scope.alertDayClick,
      eventDrop: $scope.alertOnDrop,
      eventResize: $scope.alertOnResize
    }
  };



  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  $scope.eventsExt = [{
    title: 'All Day Event',
    start: new Date(y, m, 1)
  }, {
    title: 'Long Event',
    start: new Date(y, m, d - 5),
    end: new Date(y, m, d - 2)
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d - 3, 16, 0),
    allDay: false
  }, {
    id: 999,
    title: 'Repeating Event',
    start: new Date(y, m, d + 4, 16, 0),
    allDay: false
  }, {
    title: 'Birthday Party',
    start: new Date(y, m, d + 1, 19, 0),
    end: new Date(y, m, d + 1, 22, 30),
    allDay: false
  }, {
    title: 'Click for Google',
    start: new Date(y, m, 28),
    end: new Date(y, m, 29),
    url: 'http://google.com/'
  }];
  $scope.events = [
    { title: 'Water Sampling', start: new Date(y, m, 25) }
  ];
  $scope.eventSources = [$scope.events];
}

// function CalendarCtrl($scope) {
//     var date = new Date();
//     var d = date.getDate();
//     var m = date.getMonth();
//     var y = date.getFullYear();

//     // $scope.changeTo = 'Hungarian';
//     /* event source that pulls from google.com */
//     $scope.eventSource = {
//             url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
//             className: 'gcal-event',           // an option!
//             currentTimezone: 'America/Chicago' // an option!
//     };
//     /* event source that contains custom events on the scope */
//     $scope.events = [
//       // {title: 'All Day Event',start: new Date(y, m, 1)},
//       // {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
//       // {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
//       // {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
//       // {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
//       // {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
//     ];
//     /* event source that calls a function on every view switch */
//     $scope.eventsF = function (start, end, callback) {
//       var s = new Date(start).getTime() / 1000;
//       var e = new Date(end).getTime() / 1000;
//       var m = new Date(start).getMonth();
//       var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
//       callback(events);
//     };

//     $scope.calEventsExt = {
//        color: '#f00',
//        textColor: 'yellow',
//        events: [ 
//           {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
//           {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
//           {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
//         ]
//     };
//     /* alert on eventClick */
//     $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
//         $scope.alertMessage = (event.title + ' was clicked ');
//     };
//     /* alert on Drop */
//      $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
//        $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
//     };
//     /* alert on Resize */
//     $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
//        $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
//     };
//     /* add and removes an event source of choice */
//     $scope.addRemoveEventSource = function(sources,source) {
//       var canAdd = 0;
//       angular.forEach(sources,function(value, key){
//         if(sources[key] === source){
//           sources.splice(key,1);
//           canAdd = 1;
//         }
//       });
//       if(canAdd === 0){
//         sources.push(source);
//       }
//     };
//     /* add custom event*/
//     $scope.addEvent = function() {
//       $scope.events.push({
//         title: 'Open Sesame',
//         start: new Date(y, m, 28),
//         end: new Date(y, m, 29),
//         className: ['openSesame']
//       });
//     };
//     /* remove event */
//     $scope.remove = function(index) {
//       $scope.events.splice(index,1);
//     };
//     /* Change View */
//     $scope.changeView = function(view,calendar) {
//       calendar.fullCalendar('changeView',view);
//     };
//     /* Change View */
//     $scope.renderCalender = function(calendar) {
//       calendar.fullCalendar('render');
//     };
//     /* config object */
//     $scope.uiConfig = {
//       calendar:{
//         height: 450,
//         editable: true,
//         header:{
//           left: 'title',
//           center: '',
//           right: 'today prev,next'
//         },
//         eventClick: $scope.alertOnEventClick,
//         eventDrop: $scope.alertOnDrop,
//         eventResize: $scope.alertOnResize
//       }
//     };

//     // $scope.changeLang = function() {
//     //   if($scope.changeTo === 'Hungarian'){
//     //     $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
//     //     $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
//     //     $scope.changeTo= 'English';
//     //   } else {
//     //     $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     //     $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     //     $scope.changeTo = 'Hungarian';
//     //   }
//     // };
//     /* event sources array*/
//     $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
//     $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
// }