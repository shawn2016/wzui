/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('calendarCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    
    Prism.highlightAll();
    $scope.hideCode = true;
    $scope.showCode = function(type) {
      $scope.hideCode = !$scope.hideCode;
      if ($scope.hideCode) {
        $('#' + type).show();
      } else {
        $('#' + type).hide();
      }

    }

  }])
})
