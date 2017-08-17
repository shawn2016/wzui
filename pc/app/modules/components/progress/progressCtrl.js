/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/progressbar'], function(app, ProgressBar) {
  app.controller('progressCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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

    var Circle = [{
      name: circle,
      value: 0
    }, {
      name: circle1,
      value: 0.25
    }, {
      name: circle2,
      value: 0.5
    }, {
      name: circle3,
      value: 1
    },{
      name: circle4,
      value: 1
    }];
    for (var i = 0; i < Circle.length; i++) {
      CircleFunc(Circle[i].name,Circle[i].value);
    }
    //Circle
    //文档：http://progressbarjs.readthedocs.io/en/latest/api/shape/
    function CircleFunc(name,value) {
      var bar = new ProgressBar.Circle(name, {
        color: '#aaa',
        strokeWidth: 6,
        trailWidth: 6,
        easing: 'easeInOut',
        duration: 1400,
        text: {
          autoStyleContainer: false,
        },
        from: { color: '#20a0ff', width: 6 },
        to: { color: '#20a0ff', width: 6 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-linecap', "round");
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * 100);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value + '%');
          }

        },

      });
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '40px';
      bar.text.style.color = '#4d4d4d';
      bar.animate(value);
    }
  }])
})
