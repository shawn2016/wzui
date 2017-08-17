/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('loginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    $scope.login = login;

    function login() {
      $http({
        method: 'get',
        url: 'data/loginData.json',
        data: {
          loginName: $scope.userInfo.loginName,
          loginPwd: $scope.userInfo.loginPwd
        }
      }).success(function(data) {
        var user = {
          loginName: $scope.userInfo.loginName,
          userCode: data.userCode,
          userToken: data.userToken
        };
        sessionStorage.setItem("userInfo", JSON.stringify(user));
        $state.go("home.welcome");
      })

    }

  }])
})
