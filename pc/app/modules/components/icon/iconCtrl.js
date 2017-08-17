/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/clipboard/clipboard'], function(app, Clipboard) {
  app.controller('iconCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
        $('#' + type).show();
      } else {
        $('#' + type).hide();
      }

    }
    $scope.copyIcon = function() {
      var clipboard = new Clipboard('.icon-demo');
      clipboard.on('success', function(e) {
        alert('复制成功');
        clipboard.destroy();
      });

      clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
      });
    }

  }])
})
