/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('loadingCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
    // console.log(SyntaxHighlighter);
    Prism.highlightAll();
    $scope.hideCode = false;
    $scope.showCode = function(type) {
      $scope.hideCode = !$scope.hideCode;
      if ($scope.hideCode) {
        $('.' + type).show();
      } else {
        $('.' + type).hide();
      }

    }
  }])
})
