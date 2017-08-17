/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('headerCtrl', ['$scope', '$http', '$state','$location', function($scope, $http, $state,$location) {
    /*
    暴露所有方法
     */
    //菜单的json对象
    $scope.fristMenu = fristMenu; //绑定到第一个组件菜单

      $scope.hideCode=false;
  $scope.showCode=function(type){
      $scope.hideCode=!$scope.hideCode;
      if($scope.hideCode){
        $('#'+type).show();
      }else{
         $('#'+type).hide();
      }
      
    }

     console.log((($location.url()).split('/'))[1]);
   $scope.state=(($location.url()).split('/'))[1];

    $scope.showMenu=function(){
        $('#header').toggleClass('open');
        $('#header-menu').toggleClass('open');
        
}   

    function fristMenu(n) {
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
          $state.go('components.normalize');
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
