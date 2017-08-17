/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('notificationCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
    // console.log(SyntaxHighlighter);
Prism.highlightAll();

 $scope.hideCode=false;
  $scope.showCode=function(type){
      $scope.hideCode=!$scope.hideCode;
      if($scope.hideCode){
        $('#'+type).show();
      }else{
         $('#'+type).hide();
      }
      
    }
    
                            $.bootstrapGrowl("another message, yay!", {
                              ele: 'body', // which element to append to
                              //type: 'info', // (null, 'info', 'error', 'success')
                              offset: {from: 'top', amount: 20}, // 'top', or 'bottom'
                              align: 'right', // ('left', 'right', or 'center')
                              width: '20%', // (integer, or 'auto')
                              delay: 5000000,
                              minWidth:260,
                              allow_dismiss: true,
                              stackup_spacing: 10 // spacing between consecutively stacked growls.
                            },"标题",true);
  }])
})