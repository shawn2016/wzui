define({
  'login': {
    url: "/login",
    requireCtl: ["modules/login/loginCtrl"],
    views: {
      "view_centers": {
        templateUrl: "modules/login/login.html",
        controller: "loginCtrl"
      }
    }
  },
  'main': {
    url: "/main",
    requireCtl: ["modules/main/headerCtrl", "modules/main/mainCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/main/main.html",
        controller: "mainCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'main.welcome': {
    url: '/welcome',
    templateUrl: 'modules/welcome/welcome.html',
    requireCtl: 'modules/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },
  /*==============首页============*/
  'homePage': {
    url: "/homePage",
    requireCtl: ["modules/main/headerCtrl", "modules/homePage/homePageCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/homePage/homePage.html",
        controller: "homePageCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'homePage.welcome': {
    url: '/welcome',
    templateUrl: 'modules/homePage/welcome/welcome.html',
    requireCtl: 'modules/homePage/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },

  /*==============起步============*/
  'start': {
    url: "/start",
    requireCtl: ["modules/main/headerCtrl", "modules/start/startCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/start/start.html",
        controller: "startCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'start.welcome': {
    url: '/welcome',
    templateUrl: 'modules/start/welcome/welcome.html',
    requireCtl: 'modules/start/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },

  /*==============全局css样式============*/
  'css': {
    url: "/css",
    requireCtl: ["modules/main/headerCtrl", "modules/css/cssCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/css/css.html",
        controller: "cssCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'css.welcome': {
    url: '/welcome',
    templateUrl: 'modules/css/welcome/welcome.html',
    requireCtl: 'modules/css/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },

  /*==============组件============*/
  'components': {
    url: "/components",
    requireCtl: ["modules/main/headerCtrl", "modules/components/componentsCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/components/components.html",
        controller: "componentsCtrl"
      },
      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'components.welcome': {
    url: '/welcome',
    templateUrl: 'modules/components/welcome/welcome.html',
    requireCtl: 'modules/components/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },
  'components.normalize': {
    url: '/normalize',
    templateUrl: 'modules/components/normalize/normalize.html',
    requireCtl: 'modules/components/normalize/normalizeCtrl',
    controller: 'normalizeCtrl'
  },
  'components.button': {
    url: '/button',
    templateUrl: 'modules/components/button/button.html',
    requireCtl: 'modules/components/button/buttonCtrl',
    controller: 'buttonCtrl'
  },
  'components.typography': {
    url: '/typography',
    templateUrl: 'modules/components/typography/typography.html',
    requireCtl: 'modules/components/typography/typographyCtrl',
    controller: 'typographyCtrl'
  },
  'components.grid': {
    url: '/grid',
    templateUrl: 'modules/components/grid/grid.html',
    requireCtl: 'modules/components/grid/gridCtrl',
    controller: 'gridCtrl'
  },

  'components.table': {
    url: '/table',
    templateUrl: 'modules/components/table/table.html',
    requireCtl: 'modules/components/table/tableCtrl',
    controller: 'tableCtrl'
  },

    'components.form': {
    url: '/form',
    templateUrl: 'modules/components/form/form.html',
    requireCtl: 'modules/components/form/formCtrl',
    controller: 'formCtrl'
  },
  'components.pagination': {
	    url: '/pagination',
    requireCtl: 'modules/components/pagination/paginationCtrl',
    controller: 'paginationCtrl',
	    templateUrl: 'modules/components/pagination/pagination.html',
	  },
  'components.label': {
    url: '/label',
    requireCtl: 'modules/components/label/labelCtrl',
    controller: 'labelCtrl',
    templateUrl: 'modules/components/label/label.html',
  },
  'components.image': {
    url: '/image',
    templateUrl: 'modules/components/image/image.html',
    requireCtl: 'modules/components/image/imageCtrl',
    controller: 'imageCtrl'
  },
  'components.breadcrumb': {
    url: '/breadcrumb',
    templateUrl: 'modules/components/breadcrumb/breadcrumb.html',
    requireCtl: 'modules/components/breadcrumb/breadcrumbCtrl',
    controller: 'breadcrumbCtrl'
  },
  'components.alert': {
    url: '/alert',
    templateUrl: 'modules/components/alert/alert.html',
    requireCtl: 'modules/components/alert/alertCtrl',
    controller: 'alertCtrl'
  },
    'components.loading': {
    url: '/loading',
    templateUrl: 'modules/components/loading/loading.html',
    requireCtl: 'modules/components/loading/loadingCtrl',
    controller: 'loadingCtrl'
  },
   'components.tooltip': {
    url: '/tooltip',
    templateUrl: 'modules/components/tooltip/tooltip.html',
    requireCtl: 'modules/components/tooltip/tooltipCtrl',
    controller: 'tooltipCtrl'
  },
    'components.collapse': {
    url: '/collapse',
    templateUrl: 'modules/components/collapse/collapse.html',
    requireCtl: 'modules/components/collapse/collapseCtrl',
    controller: 'collapseCtrl'
  },
    'components.tab': {
    url: '/tab',
    templateUrl: 'modules/components/tab/tab.html',
    requireCtl: 'modules/components/tab/tabCtrl',
    controller: 'tabCtrl'
  },
  'components.badge': {
    url: '/badge',
    templateUrl: 'modules/components/badge/badge.html',
    requireCtl: 'modules/components/badge/badgeCtrl',
    controller: 'badgeCtrl'
  },
    'components.steps': {
    url: '/steps',
    templateUrl: 'modules/components/steps/steps.html',
    requireCtl: 'modules/components/steps/stepsCtrl',
    controller: 'stepsCtrl'
  },
    'components.progress': {
    url: '/progress',
    templateUrl: 'modules/components/progress/progress.html',
    requireCtl: 'modules/components/progress/progressCtrl',
    controller: 'progressCtrl'
  },
   'components.timeline': {
    url: '/timeline',
    templateUrl: 'modules/components/timeline/timeline.html',
    requireCtl: 'modules/components/timeline/timelineCtrl',
    controller: 'timelineCtrl'
  },
    'components.slider': {
    url: '/slider',
    templateUrl: 'modules/components/slider/slider.html',
    requireCtl: 'modules/components/slider/sliderCtrl',
    controller: 'sliderCtrl'
  },
    'components.notification': {
    url: '/notification',
    templateUrl: 'modules/components/notification/notification.html',
    requireCtl: 'modules/components/notification/notificationCtrl',
    controller: 'notificationCtrl'
  },
  'components.rate': {
    url: '/rate',
    templateUrl: 'modules/components/rate/rate.html',
    requireCtl: 'modules/components/rate/rateCtrl',
    controller: 'rateCtrl'
  },
   'components.scrollbar': {
    url: '/scrollbar',
    templateUrl: 'modules/components/scrollbar/scrollbar.html',
    requireCtl: 'modules/components/scrollbar/scrollbarCtrl',
    controller: 'scrollbarCtrl'
  },
     'components.calendar': {
    url: '/calendar',
    templateUrl: 'modules/components/calendar/calendar.html',
    requireCtl: 'modules/components/calendar/calendarCtrl',
    controller: 'calendarCtrl'
  },
       'components.icon': {
    url: '/icon',
    templateUrl: 'modules/components/icon/icon.html',
    requireCtl: 'modules/components/icon/iconCtrl',
    controller: 'iconCtrl'
  },
    'components.menu': {
  url: '/menu',
      templateUrl: 'modules/components/menu/menu.html',
      requireCtl: 'modules/components/menu/menuCtrl',
      controller: 'menuCtrl'
},
  'components.horizenmenu': {
    url: '/horizenmenu',
    templateUrl: 'modules/components/horizenmenu/horizenmenu.html',
    requireCtl: 'modules/components/horizenmenu/horizenmenuCtrl',
    controller: 'horizenmenuCtrl'
  },
  'components.popover': {
    url: '/popover',
    templateUrl: 'modules/components/popover/popover.html',
    requireCtl: 'modules/components/popover/popoverCtrl',
    controller: 'popoverCtrl'
  },

  /*=============javascript插件=============*/
  'javascript': {
    url: "/javascript",
    requireCtl: ["modules/main/headerCtrl", "modules/javascript/javascriptCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/javascript/javascript.html",
        controller: "javascriptCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'javascript.welcome': {
    url: '/welcome',
    templateUrl: 'modules/javascript/welcome/welcome.html',
    requireCtl: 'modules/javascript/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },
   'javascript.calendar': {
    url: '/calendar',
    templateUrl: 'modules/javascript/calendar/calendar.html',
    requireCtl: 'modules/javascript/calendar/calendarCtrl',
    controller: 'calendarCtrl'
  },

  /*=============定制=============*/
  'customize': {
    url: "/customize",
    requireCtl: ["modules/main/headerCtrl", "modules/customize/customizeCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/customize/customize.html",
        controller: "customizeCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'customize.welcome': {
    url: '/welcome',
    templateUrl: 'modules/customize/welcome/welcome.html',
    requireCtl: 'modules/customize/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },
 /*=============可视化布局=============*/
   'layoutit': {
    url: "/layoutit",
    requireCtl: ["modules/main/headerCtrl", "modules/layoutit/layoutitCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/layoutit/layoutit.html",
        controller: "layoutitCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'layoutit.welcome': {
    url: '/welcome',
    templateUrl: 'modules/layoutit/layoutit/index.html',
    requireCtl: 'modules/layoutit/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },

  /*=============网站实例=============*/
  'website': {
    url: "/website",
    requireCtl: ["modules/main/headerCtrl", "modules/website/websiteCtrl"],
    views: {
      "head": {
        templateUrl: "modules/main/head.html",
        controller: "headerCtrl"
      },
      "view_centers": {
        templateUrl: "modules/website/website.html",
        controller: "websiteCtrl"
      },

      "footer": {
        templateUrl: './modules/main/footer.html'
      }
    }
  },
  'website.welcome': {
    url: '/welcome',
    templateUrl: 'modules/website/welcome/welcome.html',
    requireCtl: 'modules/website/welcome/welcomeCtrl',
    controller: 'welcomeCtrl'
  },
})
