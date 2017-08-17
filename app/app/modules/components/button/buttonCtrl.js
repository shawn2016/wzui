/*
creat by shawn 2017-3-12
 */
define(['appregister'], function(app) {
  app.controller('buttonCtrl', ['$scope', '$http', '$state','$location', function($scope, $http, $state,$location) {
    /*
    暴露所有方法
     */
    // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
    // console.log(SyntaxHighlighter);
    Prism.highlightAll();
    // console.log(Clipboard);
    //
    //  var clipboard = new Clipboard('.btn');
    $(function() {
      //设备定位
      var a = $('#docs-demo-device'),
        b = a.offset(),
        ctop = a.css("top"),
        cleft =  a.offset().left;
      $(document).on('scroll', function() {
        var c = $(document).scrollTop();
        
        if (b.top <= c) {

          a.css({ 'position': 'fixed', 'top': '0px','left':'auto' ,right:'65px'})
        } else {
          a.css({ 'position': 'absolute', 'top': ctop,'left':'auto','right':'40px'})
        }
      })
    })
    // $scope.hrefUrl=();
    // console.log($location.url()).split('/'))[1])
  }])
})
