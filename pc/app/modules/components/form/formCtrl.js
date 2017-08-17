/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/dropdown'], function(app) {
  app.controller('formCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    /*
    暴露所有方法
     */
    Prism.highlightAll();
    $scope.showCode = function(type) {
      $scope.hideCode = !$scope.hideCode;
      if ($scope.hideCode) {
        $('#' + type).slideDown();
      } else {
        $('#' + type).slideUp();
      }

    }
     $(".fileimg").hide();
     $(".file").change(function(){
            var fileImg = $(".fileimg");
            var explorer = navigator.userAgent;
            var imgSrc = $(this)[0].value;
            if (explorer.indexOf('MSIE') >= 0) {
                if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
                    imgSrc = "";
                    //fileImg.attr("src","/img/default.png");
                    return false;
                }else{
                    fileImg.attr("src",imgSrc);
                   
                }
            }else{
                if (!/\.(jpg|jpeg|png|JPG|PNG|JPEG)$/.test(imgSrc)) {
                    imgSrc = "";
                    //fileImg.attr("src","/img/default.png");
                    return false;
                }else{
                    var file = $(this)[0].files[0];
                    var url = URL.createObjectURL(file);
                    fileImg.attr("src",url);
                    $(".fileimg").show();
                    $('.rob-fileimgtext').hide();
                }
            }
        });

     $('.rob-upload-close').click(function(){
          $(".fileimg").attr('src',"");
          $('.rob-fileimgtext').show();
          $(".fileimg").hide();

      });
    //图片上传裁剪




    $('#ipt').change(function(){
        $('.rob-alert-cover, .rob-onchangecrop').show(1000);
    })
    $('#save').click(function(){
        $('.rob-alert-cover, .rob-onchangecrop').hide();

    })
    $('#again').click(function(){
        $('#ipt').click();
    })
    $('.changecropimg-zg').click(function() {
      $('.rob-alert-cover, .rob-onchangecrop').hide();
    })


     saveCallBack = function(base64) {
        
       $('.rob-onchangecropimg').attr('src',base64);
       // var pic = document.getElementById('rob-onchangecropimg');
       // pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + base64 + "\")";
       //  pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
      //最终把此base64传给后端
      /**
      $.ajax({
        data: {
          base64: base64
        } 
      })
      **/
    }

    var c = new ZmCanvasCrop({
            fileInput: $('#ipt')[0],  
            saveBtn: $('#save')[0],
            box_width: 300,  //剪裁容器的最大宽度
            box_height: 200, //剪裁容器的最大高度
            min_width: 640,  //要剪裁图片的最小宽度
            min_height: 640  //要剪裁图片的最小高度
          }, saveCallBack);




















}])
 });
