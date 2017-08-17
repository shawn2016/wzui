/*
 creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/RangeSlider'], function (app) {
    app.controller('sliderCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
        /*
         暴露所有方法
         */
        // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
        // console.log(SyntaxHighlighter);
        Prism.highlightAll();
        $scope.hideCode = false;
        $scope.showCode = function (type) {
            console.log('+++++',type)
            $scope.hideCode = !$scope.hideCode;
            if ($scope.hideCode) {
                $('#' + type).show();
            } else {
                $('#' + type).hide();
            }
        }
        $("#range").ionRangeSlider({
            hide_min_max: false,
            keyboard: false,
            min: 0,
            max: 5000,
            from: 1250,
            to: 3750,
            type: 'double',
            step: 1,
            prefix: "$",//前缀
            grid: true,//刻度
            disable: false,//禁用
            postfix: "元",//后缀
            hide_from_to: false//隐藏显示框
        });


    }])
})
