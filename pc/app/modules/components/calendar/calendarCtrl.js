/*
creat by shawn 2017-3-12
 */
define(['appregister','assets/js/calendar'], function(app,Calendar) {
  app.controller('calendarCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
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

    //日历
    var calendar = new Calendar();
    calendar.init({
      target: $('#calendar1'),
      range: [],
      multiple: true,
      sidebar:true,
      maxdays: 5,
      goCallback:function(type,date){
        console.log(type,date,this)
      },
      overdays: function(a) {
        alert('添加已达上限 ' + a + ' 天');
      }
    });
    $(".calendar").Calendar({toolbar:true,zIndex:999});
    $(".calendar2").Calendar();
    $(".calendar3").Calendar({
      filter:function(time){
      var date = new Date(time);
      if(date.getDay()==0||date.getDay()==6){
        return false;
      }
      return true;
    }});
    var c_start = $(".calendar4").Calendar({time:true,
      afterSelected: function(obj, date) {
        $(obj).blur();
        c_end.setRange([date, null]);
      }})[0];
    var c_end = $(".calendar5").Calendar({time:true,
      afterSelected: function(obj, date) {
        $(obj).blur();
        c_start.setRange([null, date]);
      }})[0];
    var c_start2 = $(".calendar6").Calendar({
      afterSelected: function(obj, date) {
        $(obj).blur();
        c_end2.setRange([date, null]);
      }})[0];
    var c_end2 = $(".calendar7").Calendar({
      afterSelected: function(obj, date) {
        $(obj).blur();
        c_start2.setRange([null, date]);
      }})[0];
    $(".calendar8").Calendar({onlyYM:true,selected:function(){
      console.log($(this.settings.target))
    }});
    $(".calendar9").Calendar({onlyHm:true,time:true});
  }])
})