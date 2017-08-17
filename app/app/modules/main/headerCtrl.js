/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('headerCtrl', ['$scope', '$http', '$state','$location', function($scope, $http, $state,$location) {
   

     console.log((($location.url()).split('/'))[1]);
   $scope.state=(($location.url()).split('/'))[1];

    $scope.fristMenu=function(n) {
      switch (n) {
        case 'homePage':
          $state.go('homePage.welcome');
          break;
        case 'start':
          $state.go('start.welcome');
          break;
        case 'css':
          $state.go('css.welcome');
          break;
        case 'components':
          $state.go('components.button');
          break;
        case 'javascript':
          $state.go('javascript.welcome');
          break;
        case 'customize':
          $state.go('customize.welcome');
          break;
        case 'website':
          $state.go('website.welcome');
          break;
        case 'layoutit':
          $state.go('layoutit.welcome');
          break;
        default:
          $state.go('homePage.welcome');
          break;
      }
    }
  }])
})
