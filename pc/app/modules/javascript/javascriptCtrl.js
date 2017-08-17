/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('javascriptCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    Prism.highlightAll();
// console.log(Clipboard);
 //
 //  var clipboard = new Clipboard('.btn');
  $scope.hideCode=false;
  $scope.showCode=function(type){
      $scope.hideCode=!$scope.hideCode;
      if($scope.hideCode){
        $('#'+type).show();
      }else{
         $('#'+type).hide();
      }
      
    }
   

  }])
})
