/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/clipboard/clipboard', 'customize'], function(app, Clipboard) {
  app.controller('customizeCtrl', ['$scope', '$http', '$state', '$location', '$anchorScroll', function($scope, $http, $state, $location, $anchorScroll) {
     $scope.goId=function(n) {
      $scope.state = n;
      $location.hash(n);
      $anchorScroll();
    }

  }])
})
