/*
 creat by shawn 2017-3-12
 */
define(['appregister'], function (app) {
  app.controller('menuCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    /*
     暴露所有方法
     */
    // SyntaxHighlighter.config.clipboardSwf = 'lib/syntaxhighlighter/scripts/clipboard.swf';
    // console.log(SyntaxHighlighter);
      Prism.highlightAll();
    // Prism.highlightAll();
// console.log(Clipboard);
    //
    //  var clipboard = new Clipboard('.btn');
    $scope.hideCode = false;
    $scope.showCode = function (type) {
      $scope.hideCode = !$scope.hideCode;
      if ($scope.hideCode) {
        $('#' + type).show();
      } else {
        $('#' + type).hide();
      }
    };

    /*menu1的执行程序*/
    $(".rob-sidebar-menu-1").each(function () {
      if ($(this).find("ul.sub-menu").size() === 0) {/*如果只有一级菜单*/
        if ($(this).children("li.nav-item").size !== 1) {
          $($(this).children("li.nav-item")[0]).removeClass("open")
        } else {
          /*不做处理*/
        }
        $(this).children("li.nav-item").children("a").on("click", function () {
          console.log(13)
          $(this).parents("ul").children("li.nav-item").removeClass("active");
          $(this).parent("li.nav-item").addClass("active");
          $(this).append('<span class="selected"></span>');
        })
      } else {/*如果不只是有一级菜单*/
        // if($(this)[0].className.indexOf("rob-sidebar-menu-1-closed")== -1){
        //
        // }
        /*初始化时为一级菜单的ul设为block，为了展开其他一级菜单时，第一个一级菜单不关闭*/
        // $(this).children("li.nav-item").each(function (index) {
        //   if (index === 0) {
        //     $(this).children("ul.sub-menu").css("display", "block")
        //     console.log($(this))
        //   }
        // });
        $(this).children("li").find("a").on("click", function (e) {
          if ($(this).parents().hasClass("sub-menu")) {/*如果点击的是二级菜单*/
            if ($(this).parent("li").hasClass("open") === true) {/*当为展开的情况*/
              $(this).next("ul.sub-menu").slideUp("fast");
              $(this).parent("li").removeClass("open");
              $(this).parent("li").removeClass("active")
              $(this).children("span.arrow").removeClass("open")
            } else {/*当为闭合的情况下*/
              console.log($(this).next("ul.sub-menu"))
              $(this).next("ul.sub-menu").slideDown("fast");
              $(this).parent("li").addClass("open");
              $(this).parent("li").addClass("active");
              $(this).children("span.arrow").addClass("open")
            }
          } else {/*如果点击的一级菜单*/
            console.log(isMenuClose)
            console.log($(this).parent().parent())
            var isMenuClose = $(this).parent().parent()[0].className.indexOf("rob-sidebar-menu-1-closed") == -1;
            if (!isMenuClose) {/*如果菜单为关闭状态*/
              console.log(33)
              /*不进行滑动动画*/
            } else {/*如果菜单为开启状态*/
              if ($(this).parent("li").hasClass("open") === true) {/*当为展开的情况*/
                $(this).parent("li").removeClass("open");
                $(this).children("span.arrow").removeClass("open")
                $(this).next("ul.sub-menu").slideUp("fast");
              } else {/*当为闭合的情况下*/
                $(this).parent("li").addClass("open");
                $(this).children("span.arrow").addClass("open")
                $(this).next("ul.sub-menu").slideDown("fast");
              }
            }
          }
        });

        $(this).children("li").find(".sub-menu").find("a").on("click", function () {
          // console.log($(this).parents(".rob-sidebar-menu-1").find())
          $(this).parents(".rob-sidebar-menu-1").find("li").removeClass("active")
          if ($(this).next("ul").size() === 1) {/*如果点击的是可展开的按钮*/
            /*一级菜单变色*/
            $(this).parents("ul.sub-menu").parent("li.nav-item").addClass("active")
            console.log($(this).parents("li.nav-item.open.active").find("a:first").append('<span class="selected"></span>'))
          } else {
            $(this).parents("li.nav-item").addClass("active");
            console.log($(this).parents("li.nav-item.open.active").find("a:first"))
            $(this).parents("li.nav-item.open.active").find("a:first").append('<span class="selected"></span>');
          }
        });
      }
    });

    /*menu2的执行程序*/
    var numMenu2 = 0;
    $(window).resize(function () {
      if ($(window).width() <= 768) {
        if (numMenu2 == 0) {
          numMenu2++;
          /*避免多次绑定事件*/
          $(".rob-sidebar-menu-2").each(function () {
            if ($(this).find("ul.sub-menu").size() === 0) {/*如果只有一级菜单*/
              if ($(this).children("li.nav-item").size !== 1) {
                $($(this).children("li.nav-item")[0]).removeClass("open")
              } else {
                /*不做处理*/
              }
              $(this).children("li.nav-item").children("a").on("click", function () {
                console.log(13)
                $(this).parents("ul").children("li.nav-item").removeClass("active");
                $(this).parent("li.nav-item").addClass("active");
                $(this).append('<span class="selected"></span>');
              })
            } else {/*如果不只是有一级菜单*/
              // if($(this)[0].className.indexOf("rob-sidebar-menu-1-closed")== -1){
              //
              // }
              /*初始化时为一级菜单的ul设为block，为了展开其他一级菜单时，第一个一级菜单不关闭*/
              // $(this).children("li.nav-item").each(function (index) {
              //   if (index === 0) {
              //     $(this).children("ul.sub-menu").css("display", "block")
              //     console.log($(this))
              //   }
              // });
              $(this).children("li").find("a").on("click", function (e) {
                if ($(this).parents().hasClass("sub-menu")) {/*如果点击的是二级菜单*/
                  if ($(this).parent("li").hasClass("open") === true) {/*当为展开的情况*/
                    $(this).next("ul.sub-menu").slideUp("fast");
                    $(this).parent("li").removeClass("open");
                    $(this).parent("li").removeClass("active")
                    $(this).children("span.arrow").removeClass("open")
                  } else {/*当为闭合的情况下*/
                    console.log($(this).next("ul.sub-menu"))
                    $(this).next("ul.sub-menu").slideDown("fast");
                    $(this).parent("li").addClass("open");
                    $(this).parent("li").addClass("active");
                    $(this).children("span.arrow").addClass("open")
                  }
                } else {/*如果点击的一级菜单*/
                  console.log(isMenuClose)
                  console.log($(this).parent().parent())
                  var isMenuClose = $(this).parent().parent()[0].className.indexOf("rob-sidebar-menu-2-closed") == -1;
                  if (!isMenuClose) {/*如果菜单为关闭状态*/
                    console.log(33)
                    /*不进行滑动动画*/
                  } else {/*如果菜单为开启状态*/
                    if ($(this).parent("li").hasClass("open") === true) {/*当为展开的情况*/
                      $(this).parent("li").removeClass("open");
                      $(this).children("span.arrow").removeClass("open")
                      $(this).next("ul.sub-menu").slideUp("fast");
                    } else {/*当为闭合的情况下*/
                      $(this).parent("li").addClass("open");
                      $(this).children("span.arrow").addClass("open")
                      $(this).next("ul.sub-menu").slideDown("fast");
                    }
                  }
                }
              });

              $(this).children("li").find(".sub-menu").find("a").on("click", function () {
                $(this).parents(".rob-sidebar-menu-2").find("li.nav-item").removeClass("active ")
                if ($(this).next("ul").size() === 1) {/*如果点击的是可展开的按钮*/
                  /*一级菜单变色*/
                  $(this).parents("ul.sub-menu").parent("li.nav-item").addClass("active")
                  console.log($(this).parents("li.nav-item.open.active").find("a:first").append('<span class="selected"></span>'))
                } else {
                  $(this).parents("li.nav-item").addClass("active");
                  console.log($(this).parents("li.nav-item.open.active").find("a:first"))
                  $(this).parents("li.nav-item.open.active").find("a:first").append('<span class="selected"></span>');
                }
              });
            }
          });
        }
      } else {

      }
    })

    if ($(window).width() > 768) {

      $(".rob-sidebar-menu-2").each(function () {
        $(this).find("li").on("click",function (event) {
          event.stopPropagation();
          if($(this).parent(".rob-sidebar-menu-2").size() != 0){/*如果点击的是一级菜单*/
            $(this).parent("ul").children("li").removeClass("open");
            $(this).parent("ul").children("li").removeClass("active");
            $(this).addClass("open")
            $(this).addClass("active")
          }
          if($(this).parent(".rob-sidebar-menu-2").size() == 0 && $(this).children("ul").size() != 0){ /*不是一级，并且有子级菜单*/
            console.log($(this).children("ul").size())
            if($(this).hasClass("open")){
              $(this).removeClass("open")
              $(this).find(".arrow").removeClass("open")
            }else{
              $(this).addClass("open");
              $(this).find(".arrow").addClass("open")
            }
          }
          if($(this).children("ul").size() == 0){ /*如果没有子级菜单*/
            $(".rob-sidebar-menu-2").find("li").removeClass("active")
            $(this).addClass("active");
            $(this).parentsUntil(".rob-sidebar-menu-2","li").addClass("active")
          }
        })
      });

      $(".rob-sidebar-menu-3").each(function () {
        $(this).find("li").on("click",function () {
          if($(this).children("ul").size() == 0){
            $(".rob-sidebar-menu-3").find("li").removeClass("active")
            $(this).addClass("active");
            $(this).parentsUntil(".rob-sidebar-menu-3","li").addClass("active")
          }
        })
      })
    }
    $scope.changToSmall_1_text = "点击切换为小图标菜单"
    $scope.changToSmall_1_flag = true;
    $scope.changToSmall_1_function = function (toggle) {
      if($scope.changToSmall_1_flag == toggle){
        $(".rob-sidebar-menu-1").addClass("close");
        $scope.changToSmall_1_text = "点击切换为大图标菜单"
      }else{
        $(".rob-sidebar-menu-1").removeClass("close");
        $scope.changToSmall_1_text = "点击切换为小图标菜单"
      }
      $scope.changToSmall_1_flag = !$scope.changToSmall_1_flag
    };

    $scope.changToSmall_3_text = "点击切换为小图标菜单"
    $scope.changToSmall_3_flag = true;
    $scope.changToSmall_3_function = function (toggle) {
      if($scope.changToSmall_3_flag == toggle){
        $(".rob-sidebar-menu-3").addClass("close");
        $scope.changToSmall_3_text = "点击切换为大图标菜单"
      }else{
        $(".rob-sidebar-menu-3").removeClass("close");
        $scope.changToSmall_3_text = "点击切换为小图标菜单"
      }
      $scope.changToSmall_3_flag = !$scope.changToSmall_3_flag
    }

    $scope.changToSmall_2_text = "点击切换为小图标菜单"
    $scope.changToSmall_2_flag = true;
    $scope.changToSmall_2_function = function (toggle) {
      if($scope.changToSmall_2_flag == toggle){
        $(".rob-sidebar-menu-2").addClass("close");
        $scope.changToSmall_2_text = "点击切换为大图标菜单"
      }else{
        $(".rob-sidebar-menu-2").removeClass("close");
        $scope.changToSmall_2_text = "点击切换为小图标菜单"
      }
      $scope.changToSmall_2_flag = !$scope.changToSmall_2_flag
    }

    $scope.changToSmall_22_text = "点击隐藏右侧菜单"
    $scope.changToSmall_22_flag = true;
    $scope.changToSmall_22_function = function (toggle) {
      if($scope.changToSmall_22_flag == toggle){
        $(".rob-sidebar-menu-2").addClass("close-right");
        $scope.changToSmall_22_text = "点击展开右侧菜单"
      }else{
        $(".rob-sidebar-menu-2").removeClass("close-right");
        $scope.changToSmall_22_text = "点击隐藏右侧菜单"
      }
      $scope.changToSmall_22_flag = !$scope.changToSmall_22_flag
    }


  }])
});

