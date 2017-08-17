/*
creat by shawn 2017-3-12
 */
define(['appregister','assets/js/dropdown'], function(app) {
  app.controller('horizenmenuCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    Prism.highlightAll();
    $scope.showCode=function(type){
      $scope.hideCode=!$scope.hideCode;
      if($scope.hideCode){
        $('#'+type).slideDown();
      }else{
         $('#'+type).slideUp();
      }
    }


    //一级菜单绑定的click事件
    function clickFun1(){
      console.log($(this).next("ul").length);
      if($(this).next("ul").length>0){
        if($(this).parent("li").hasClass("open")){
          $(this).parent("li").removeClass("open");
          $(this).next("ul").slideUp(200);
          console.log("关闭");
        }else{
          $(this).parent("li").addClass("open");
          $(this).next("ul").slideDown(200);
          console.log("打开");
        }
      }else{
        
        if($(this).parent("li").hasClass("active")){
          $(this).parent("li").removeClass("active");
          $(this).next("ul").slideUp(200);
          console.log("关闭");
        }else{
          $(this).parent("li").addClass("active");
          $(this).next("ul").slideDown(200);
          console.log("打开");
        }
      }
      
    }
    //二级菜单绑定的click事件
   function clickFun2(){
      if($(this).next("ul").length>0){
        if($(this).parent("li").hasClass("open")){
          $(this).parent("li").removeClass("open");
          $(this).next("ul").slideUp(200);
          console.log("关闭");
        }else{
          $(this).parent("li").addClass("open");
          $(this).next("ul").slideDown(200);
          console.log("打开");
        }  
      }else{
        if($(this).parent("li").hasClass("active")){
          $(this).parent("li").removeClass("active");
          $(this).next("ul").slideUp(200);
          console.log("关闭");
        }else{
          $(this).parent("li").addClass("active");
          $(this).next("ul").slideDown(200);
          console.log("打开");
        }
      }
      
    }
    //给菜单绑定监听事件的函数
    function addEventToMenu(){
      //一级菜单绑定的click事件
      $(".rob-hormenu-li1>span").bind("click",clickFun1)
      //二级菜单绑定的事件
      $(".rob-hormenu-li2>span").bind("click",clickFun2)
    }
    //给菜单移除监听事件的函数
    function removeEventToMenu(){
      //一级菜单绑定的click事件
      $(".rob-hormenu-li1>span").unbind("click",clickFun1)
      //二级菜单绑定的事件
      $(".rob-hormenu-li2>span").unbind("click",clickFun2)
    }
    //当窗口加载完毕后如果宽度小于768则绑定click事件
    console.log($(window).width())
    var conunt=0;
    if($(window).width()<1000){
      addEventToMenu();
      conunt=conunt+1;
    }
    //监视当浏览器窗口的宽度下雨768px 时再绑定监听事件
    $(window).resize(function() { 
      if($(window).width()>1000){
        conunt=0;
      } else {
        conunt=conunt+1
      }
      if($(window).width()<1000 && conunt===1){
        addEventToMenu();
      }else if($(window).width()>1000){
        removeEventToMenu();
      }
      console.log(conunt)
    })
  }])
})
