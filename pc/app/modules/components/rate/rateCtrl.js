/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/jquery.raty'], function(app) {
  app.controller('rateCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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
      //显示分数
    scoreFun($("#startone"))
    scoreFun($("#starttwo"), {
      fen_d: 22, //每一个a的宽度
      ScoreGrade: 5 //a的个数 10或者
    })
    $(".show_number li p").each(function(index, element) {
      var num = $(this).attr("tip");
      var www = num * 2 * 16; //
      $(this).css("width", www);
      $(this).parent(".atar_Show").siblings("span").text(num + "分");
    });
  }])
})
