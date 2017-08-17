'use strict';
// 配置baseurl
require(['config'], function(config) {
  var baseurl = document.getElementById('main').getAttribute('data-baseurl');
  //文件依赖
  var configParam = {
    baseurl: baseurl, //依赖相对路径
    paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
      'angular': 'lib/angular/angular.min',
      'ui-router': 'lib/angular-ui-route/angular-ui-router',
      "httpInterceptor": "common/httpInterceptors",
      "jquery": "lib/jquery/dist/jquery",
      "prism":'lib/prismjs/prism',
      "clipboard":'http://cdn.bootcss.com/clipboard.js/1.6.1/clipboard',
      "modal":'assets/js/modal',
      "alert":'assets/js/alert',
      "growl":'assets/js/growl',
       "customize":'assets/js/customize',
       "lightGallery":'assets/js/lightGallery',
       "tooltip":'assets/js/tooltip',
       "popover":'assets/js/popover',
       "gt-canvas-crop":"assets/js/gt-canvas-crop"
    },
    shim: {
      'angular': {
        exports: 'angular'
      },
     

      'ui-router': {
        deps: ['angular'],
        exports: 'uiroute'
      },
       'clipboard': ['angular','ui-router','jquery'],
      'httpInterceptor': ['angular'],'modal': ['jquery'],'customize': ['jquery'],'alert': ['jquery'],'growl': ['jquery'],'lightGallery': ['jquery'],'tooltip':['jquery'],'popover':['jquery','tooltip'],'gt-canvas-crop':['jquery']
    }
  };
  require.config(configParam);
  require(['angular', 'ui-router', 'app', 'httpInterceptor', 'jquery','prism','clipboard','modal','alert','growl','lightGallery','popover','gt-canvas-crop'], function(angular, uirouter, app) {
    angular.bootstrap(document, [app.name]);
  });
})
