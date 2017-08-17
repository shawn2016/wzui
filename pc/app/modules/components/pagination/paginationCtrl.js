/**
 * Created by Administrator on 2017-4-20.
 */
/*
 creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
    app.controller('paginationCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        /*
         暴露所有方法
         */
        // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
        // console.log(SyntaxHighlighter);
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