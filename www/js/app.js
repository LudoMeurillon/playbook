angular.module('ionicApp', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('bookmenu', {
      url: "/book",
      abstract: true,
      templateUrl: "book-menu.html"
    })
    .state('bookmenu.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "home.html"
        }
      }
    })
    .state('bookmenu.play', {
      url: "/play",
      views: {
        'menuContent' :{
          templateUrl: "check-in.html",
          controller: "CheckinCtrl"
        }
      }
    })
    .state('bookmenu.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "attendees.html",
          controller: "AttendeesCtrl"
        }
      }
    })
  
  $urlRouterProvider.otherwise("/book/home");
})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.leftButtons = [{
    type: 'button-icon button-clear ion-navicon',
    tap: function(e) {
      $ionicSideMenuDelegate.toggleLeft($scope.$$childHead);
    }
  }];
  
  $scope.attendees = [
    { firstname: 'Nicolas', lastname: 'Cage' },
    { firstname: 'Jean-Claude', lastname: 'Van Damme' },
    { firstname: 'Keanu', lastname: 'Reeves' },
    { firstname: 'Steven', lastname: 'Seagal' }
  ];

  $scope.toggleMenu = function(){
    $scope.leftButtons[0].tap();
  }
})

.controller('CheckinCtrl', function($scope) {
  $scope.showForm = true;
  
  $scope.shirtSizes = [
    { text: 'Large', value: 'L' },
    { text: 'Medium', value: 'M' },
    { text: 'Small', value: 'S' }
  ];
  
  $scope.attendee = {};
  $scope.submit = function() {
    if(!$scope.attendee.firstname) {
      alert('Info required');
      return;
    }
    $scope.showForm = false;
    $scope.attendees.push($scope.attendee);
  };
  
})

.controller('AttendeesCtrl', function($scope) {
  
  $scope.activity = [];
  $scope.arrivedChange = function(attendee) {
    var msg = attendee.firstname + ' ' + attendee.lastname;
    msg += (!attendee.arrived ? ' has arrived, ' : ' just left, '); 
    msg += new Date().getMilliseconds();
    $scope.activity.push(msg);
    if($scope.activity.length > 3) {
      $scope.activity.splice(0, 1);
    }
  };
  
});