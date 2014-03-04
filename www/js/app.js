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
          templateUrl: "play.html",
          controller: "PlayCtrl"
        }
      }
    })
    .state('bookmenu.history', {
      url: "/history",
      views: {
        'menuContent' :{
          templateUrl: "history.html",
          controller: "HistoryCtrl"
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

.controller('PlayCtrl', function($scope, $state, $ionicModal) {
  $scope.showForm = true;
  $scope.gamers = [];
  $scope.gamer = {};

  $scope.addGamer = function(){
    for (var i = 0; i < $scope.gamers.length; i++) {
      if($scope.gamers[i].name == $scope.gamer.name){
        return;
      }
    };
    $scope.gamers.push({name: $scope.gamer.name, score:0});
    $scope.gamer.name = "";
  }

  $scope.start = function(){
    $scope.showForm = false;
  }

  $scope.scoring = {}

  $scope.score = function(){
    $scope.scoring.gamers = [];
    $scope.scoring.gamer = null;
    $scope.scoring.gamers = $scope.scoring.gamers.concat($scope.gamers);
    $scope.nextScore();
    $scope.modal.show();
  }

  $scope.nextScore = function(){
    if($scope.scoring.gamer){
      console.log("scored");
      $scope.scoring.gamer.score = $scope.scoring.gamer.score + parseInt($scope.scoring.score);
      $scope.scoring.gamers.shift();
    }
    if($scope.scoring.gamers.length > 0){
      $scope.scoring.gamer = $scope.scoring.gamers[0];
      $scope.scoring.gamer.score = null;
    }else{
      $scope.modal.hide();
    }
  }

  // Load the modal from the given template URL
  $ionicModal.fromTemplateUrl('score.html', function(modal) {
    $scope.modal = modal;
  }, {
    // Use our scope for the scope of the modal to keep it simple
    scope: $scope,
    // The animation we want to use for the modal entrance
    animation: 'slide-in-up'
  });


})
.controller('HistoryCtrl', function($scope) {

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
