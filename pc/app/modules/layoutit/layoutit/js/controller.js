var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
  let dataEvent = 'niubideshijian-----------'
  let $style = $('<style></style>')
  $('head').append($style)
  $scope.getConfigJson = getConfigJson; //获取json变量
  // $scope.varConfig = varConfig; //配置变量

  $scope.getConfigJson();
  $scope.__propValue = ''
  $scope.__componentName = ''
  $scope.domValue = ''
  $scope.filterVar = (str) => {
    let s = str.split('')
    s.length = s.length - 4
    return s.join('')
  }

  function getConfigJson() {
    $http.get('../../../../config.json').success(function(data) {
      $scope.configJson = data
      let varsCopy = data.varsCopy
      let keys = Object.keys(varsCopy)
      var obj = {}
      keys.forEach((item) => obj[varsCopy[item].id] = varsCopy[item]);
      $scope.variateConfig = obj
    })
  }

  function configFunc(e) {
    //获取dom
    e.preventDefault();
    var currenteditor = $(this).parent().parent().find('.view');
    var eText = currenteditor.html();
    $scope.allDom = eText;
    getClass(this);
  }
  /**
   * 编辑
   */
  $('.container-fluid').delegate('[data-target="varConfig"]', 'click', configFunc);
  $('.container-fluid').delegate('[data-target="searchvars"]', 'click', function(e) {
    //获取dom
    e.preventDefault();
    var currenteditor = $(this).parent().parent().find('.view');
    var eText = currenteditor.html();
    $scope.allDom = eText;
    getClass(this);
  });

  $('.container-fluid').delegate('[data-target="red"]', 'click', function(e) {
    //获取dom
    e.preventDefault();
    for (var i = 0; i < $scope.configJson.varsCopy.length; i++) {

      for (var j = 0; j < $scope.configJson.varsCopy[i].vars.length; j++) {

        if (($scope.configJson.varsCopy[i].vars[j].value.indexOf('#') != -1) && ($scope.configJson.varsCopy[i].vars[j].value.indexOf('solid')) == -1 ) {

          let classes = $scope.configJson.varsCopy[i].vars[j].key.split('F');
          let componentName = $scope.configJson.varsCopy[i].id;
          let classMedia = ''
          if (classes.length === 4) {
            classMedia = domTransFunc(undefined, classes[2])
            componentName = `${componentName}Media`
          }
          let className = domTransFunc(undefined, classes[1]);

          $scope[`${componentName}class`] = $scope[`${componentName}class`] || ''
          if (classes.length === 4) {
            $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${classMedia} {
          ${className} {
            ${classes[3]}: orange
          }
        }
      `
          } else {
            $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${className} {
          ${classes[2]}: orange
        }
      `
          }
        } else if (($scope.configJson.varsCopy[i].vars[j].value.indexOf('solid') != -1) && (($scope.configJson.varsCopy[i].vars[j].value.indexOf('#')) != -1) ) {


          let solidValue = $scope.configJson.varsCopy[i].vars[j].value;
          let solidValueArray = solidValue.split(' ');
          let solidColor;
          for (var z = 0; z < solidValueArray.length; z++) {
            if (solidValueArray[z].indexOf('#') == 0) {
              solidValueArray[z] = 'orange';
            }

          }
          let newsolidValueArray = solidValueArray.join(" ");

          let classes = $scope.configJson.varsCopy[i].vars[j].key.split('F');
          let componentName = $scope.configJson.varsCopy[i].id;
          let classMedia = ''
          if (classes.length === 4) {
            classMedia = domTransFunc(undefined, classes[2])
            componentName = `${componentName}Media`
          }

          let className = domTransFunc(undefined, classes[1]);

          $scope[`${componentName}class`] = $scope[`${componentName}class`] || ''
          if (classes.length === 4) {
            console.log(j);

            if (j % 10 == 0) {
              $scope[`${componentName}class`] = $scope[`${componentName}class`] += '</style><style>' + `
        ${classMedia} {
          ${className} {
            ${classes[3]}: ${newsolidValueArray}
          }
        }
      `
            } else {
              $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${classMedia} {
          ${className} {
            ${classes[3]}: ${newsolidValueArray}
          }
        }
      `
            }

          } else {
            if (j % 10 == 0) {

              $scope[`${componentName}class`] = $scope[`${componentName}class`] += '</style><style>' + `
        ${className} {
          ${classes[2]}: ${newsolidValueArray}
        }
      `
            } else {

              $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${className} {
          ${classes[2]}: ${newsolidValueArray}
        }
      `
            }

          }

        }

      }


    }
  });

  $('.container-fluid').delegate('[data-target="redView"]', 'click', function(e) {
    //获取dom
    e.preventDefault();
    let namezujian = $('body').find('.selected').find('[name="robot-component"]').val()
    for (var i = 0; i < $scope.configJson.varsCopy.length; i++) {

      for (var j = 0; j < $scope.configJson.varsCopy[i].vars.length; j++) {
        if (($scope.configJson.varsCopy[i].vars[j].value.indexOf('#') == 0) && !($scope.configJson.varsCopy[i].vars[j].value.indexOf('solid')) == 0 ) {
          let componentName = $scope.configJson.varsCopy[i].id;
          if (!$scope[componentName]) {
            $scope[componentName] = $('<style type="text/css"></style>');
            $('head').append($scope[componentName]);
          }
          $scope[componentName].append($scope[`${componentName}class`])
          console.log($scope[`${componentName}class`]);

          if (!$scope[`${componentName}Media`]) {
            $scope[`${componentName}Media`] = $('<style></style>');
            $('head').append($scope[`${componentName}Media`]);
          }
          $scope[`${componentName}Media`].append($scope[`${componentName}Mediaclass`])
        }
      }
    }
  });


  $('.container-fluid').delegate(`[data-event="${dataEvent}"]`, 'blur', function(e) { // 保存 失去焦点后保存
    //获取dom
    let $this = $(this);
    let componentName = $this.attr('data-componentName');
    let varitable = $scope.variateConfig[componentName]


    if (!varitable) {
      return;
    }
    let varitables = varitable.vars;
    for (let i = 0, len = varitables.length; i < len; i++) {
      if (varitables[i].key === $this.attr('data-key')) {
        varitables[i].value = $this.val()
        break;
      }
    }
 
// console.log( $scope[`${componentName}length`]);
    let classes = $this.attr('data-key').split('F');
    let classMedia = ''
    if (classes.length === 4) {
      classMedia = domTransFunc(undefined, classes[2])
      componentName = `${componentName}Media`
    }
    let className = domTransFunc(undefined, classes[1]);

    $scope[`${componentName}class`] = $scope[`${componentName}class`] || ''
    if (classes.length === 4) {
         $scope[`${componentName}length`] = $scope[`${componentName}length`] || 0
    $scope[`${componentName}length`] = $scope[`${componentName}length`] + 1;
      console.log($scope[`${componentName}length`]);
      if (($scope[`${componentName}length`]) % 10 == 0) {
        console.log('lllllllll')

        $scope[`${componentName}class`] = $scope[`${componentName}class`] += '</style><style>' + `
        ${classMedia} {
          ${className} {
            ${classes[3]}: ${$this.val()}
          }
        }
      `
      } else {
        $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${classMedia} {
          ${className} {
            ${classes[3]}: ${$this.val()}
          }
        }
      `
      }

    } else {
          $scope[`${componentName}length`] = $scope[`${componentName}length`] || 0
    $scope[`${componentName}length`] = $scope[`${componentName}length`] + 1;
      if (($scope[`${componentName}length`]) % 10 == 0) {
        console.log('lllllllll')
        $scope[`${componentName}class`] = $scope[`${componentName}class`] += '</style><style>' + `
        ${className} {
          ${classes[2]}: ${$this.val()}
        }
      `

      } else {
        $scope[`${componentName}class`] = $scope[`${componentName}class`] += `
        ${className} {
          ${classes[2]}: ${$this.val()}
        }
      `
      }

    }
  })
  if ($("body").hasClass("selected")) {
    $('.sidebar-nav').attr('style', 'top:80px;');
    $('body').attr('style', 'padding-top:90px;');
  }
  $('.demo').delegate('.box-element', 'click', function(e) {
    let target = e.target;
    let localName = target.localName;
    if (localName === 'button' || localName === 'i' || localName === 'input') {
      return
    }
    $('.demo').find('.configuration').attr('style', 'opacity: 0; display: none;')
    $(this).find('.configuration').attr('style', 'opacity: 1; display: block;');
    $('.demo').find('.box-element').removeClass('selected');
    $(this).addClass('selected');
    $('.sidebar-nav').attr('style', 'top:80px;');
    $('body').attr('style', 'padding-top:90px;');



    $(this).siblings('.ui-draggable').find('.rob-form-group').html('');

  })

  $(document).ready(function() {
    if ($('.demo').find('.selected').length == 0) {
      $('.sidebar-nav').attr('style', 'top:40px;');
      $('body').attr('style', 'padding-top:50px;');
    } else {
      $('.sidebar-nav').attr('style', 'top:80px;');
      $('body').attr('style', 'padding-top:90px;');
    }
  });

  /**
   * 更新
   */
  $('.container-fluid').delegate(`[data-target="varUpdate"]`, 'click', function(e) { // 保存
    let componentName = $(this).parent().parent().find(`[data-event="${dataEvent}"]`).attr('data-componentName')
    if (!componentName) {
      return;
    }
    if (!$scope[componentName]) {
      $scope[componentName] = $('<style></style>');
      $('head').append($scope[componentName]);
    }
    $scope[componentName].append($scope[`${componentName}class`])

    if (!$scope[`${componentName}Media`]) {
      $scope[`${componentName}Media`] = $('<style></style>');
      $('head').append($scope[`${componentName}Media`]);
    }
    $scope[`${componentName}Media`].append($scope[`${componentName}Mediaclass`])
  })

  /**
   * 重置
   */
  $('.container-fluid').delegate(`[data-target="varReset"]`, 'click', function(e) { // 保存
    let componentName = $(this).parent().parent().find(`[data-event="${dataEvent}"]`).attr('data-componentName')
    var that = this
    if (!componentName) {
      return;
    }
    if (!$scope[componentName]) {
      return;
    }
    $http.get('../../../../config.json').success(function(data) {
      let componentName = `${$(that).parent().find('input').val()}Vars`
      let varsCopy = data.varsCopy
      let keys = Object.keys(varsCopy)
      let obj = {}
      keys.forEach((item) => obj[varsCopy[item].id] = varsCopy[item])
      $scope.variateConfig[componentName] = obj[componentName]
      $scope.configJson.varsCopy.forEach(item => {
        if (item.key === componentName) {
          Object.assign(item, obj[componentName])
        }
      })
      render($(that).parent().parent())
    })
    $scope[`${componentName}class`] = ''
    $scope[`${componentName}Mediaclass`] = ''
    $scope[componentName].html('')
    $scope[`${componentName}Media`].html('')
  })


  /**
   * 保存
   */
  $('.container-fluid').delegate(`[data-target="varSave"]`, 'click', function(e) { // 保存
    let componentName = $(this).parent().parent().find(`[data-event="${dataEvent}"]`).attr('data-componentName')
    if (!$scope.variateConfig) {
      return;
    }
    let variateConfig = []
    Object.keys($scope.variateConfig).forEach((item) => {
      variateConfig.push($scope.variateConfig[item])
    })
    $scope.configJson.varsCopy = variateConfig;
    localStorage.setItem('configJson', JSON.stringify($scope.configJson))
  })


  /**
   * 搜索
   */
  $('.container-fluid').delegate(`[data-target="search"]`, 'click', function(e) {
    let $this = $(this);
    let inputs = $this.parent().parent().parent().parent().find('input');
    let domValue = (inputs.get(0).value || '').trim();
    let propName = (inputs.get(1).value || '').trim();
    let mediaValue = (inputs.get(2).value || '').trim();
    let componentName = $this.parent().parent().parent().parent().parent().parent().find('input[type="hidden"]').val()

    $scope.__componentName = componentName
    $scope.domValue = domValue
    $scope.__propValue = propName
    $scope.__mediaValue = mediaValue

    let str = domTransFunc('dom', domValue)
    let mediaName = domTransFunc('dom', mediaValue)
    $scope.filterValuePropName = propName
    $scope.filterValueComponentName = `$${componentName}F${str}`
    $scope.filterValueMediaName = `${mediaName}`
    render($this.parent().parent().parent().parent().parent().parent())
  })

  $('.container-fluid').delegate('.rob-icon-delete', 'click', function(e) {
    configFunc.bind($(this).parent().parent())(e)
  })

  $('.container-fluid').delegate('.rob-icon-upload', 'click', function(e) {
    $(this).parent().toggleClass('varsList-lg');
  })

  Array.prototype.unique3 = function() {
    var res = []
    var json = {}
    for (var i = 0; i < this.length; i++) {
      if (!json[this[i]]) {
        res.push(this[i])
        json[this[i]] = 1
      }
    }
    return res
  }

  function domTransFunc(type, domStr) {
    var newDomStr;
    if (type === 'dom') {
      var regW = /\:/g; //伪类
      var regX = /\+/g; //兄弟元素
      var regP = /\>/g; //> 父元素下的子元素
      var regT = /\./g; // 同级
      var regC = /\s/g; // 子元素
      var regB = /\,/g; // ,逗号
      var regL = /\[/g; // [左括号
      var regR = /\]/g; // ]右括号
      var regD = /\=/g; // ]右括号
      var regY = /\"/g; // "
      var regJ = /\#/g; // #
      var regU = /\(/g; // （
      var regV = /\)/g; // ）
      var regA = /\@/g; // ）
      var regS = /\*/g; // *
      var regG = /\^/g; // ^
      newDomStr = domStr
        .replace(regP, 'P')
        .replace(regW, 'W')
        .replace(regX, 'X')
        .replace(regT, 'T')
        .replace(regB, 'B')
        .replace(regL, 'L')
        .replace(regR, 'R')
        .replace(regD, 'D')
        .replace(regY, 'Y')
        .replace(regJ, 'J')
        .replace(regC, 'C')
        .replace(regU, 'U')
        .replace(regA, 'A')
        .replace(regS, 'S')
        .replace(regG, 'G')
        .replace(regV, 'V');
    } else {
      var regW = /W/g; //伪类
      var regX = /X/g; //兄弟元素
      var regP = /P/g; //> 父元素下的子元素
      var regT = /T/g; // 同级
      var regC = /C/g; // 子元素
      var regE = /E/g; // 元素
      var regB = /B/g; // 逗号
      var regL = /L/g; // [左括号
      var regR = /R/g; // ]右括号
      var regD = /D/g; // =号
      var regY = /Y/g; // "
      var regJ = /J/g; // #
      var regU = /U/g; // （
      var regV = /V/g; // ）
      var regA = /A/g; // ）
      var regG = /G/g; // ^
      var regS = /S/g; // *

      newDomStr = domStr
        .replace(regP, '>')
        .replace(regW, ':')
        .replace(regX, '+')
        .replace(regT, '.')
        .replace(regL, '[')
        .replace(regR, ']')
        .replace(regB, ',')
        .replace(regD, '=')
        .replace(regY, '"')
        .replace(regJ, '#')
        .replace(regC, ' ')
        .replace(regU, '(')
        .replace(regA, '@')
        .replace(regS, '*')
        .replace(regG, '^')
        .replace(regV, ')');

      // if (newDomStr.indexOf('F')) {
      //   newDomStr = (newDomStr.split('F'))[0];
      // }

    }
    return newDomStr;
  }
  // 获取class
  var styleStr = "";

  function getClass(dom) {
    let componentName = $(dom).parent().find('[name="robot-component"]').val();
    let componentVariate = $scope.variateConfig[`${componentName}Vars`]
    let parent = $(dom).parent().parent();
    parent.siblings('.ui-draggable').find('.rob-form-group').html('')
    let viewDom = parent.find('.demoVas')
    let _html = viewDom.html() || ''
    if (_html.trim()) {
      viewDom.html('')
      return
    }
    if (!componentVariate) {
      return
    }
    let classes = 'varsList-lg';
    !viewDom.find('.varsList').hasClass(classes) && (classes = '')
    let html = `<div class="varsList ${classes}" ><i class="rob-icon-delete"></i><i class="rob-icon-upload"></i>`
    html += `
      <div class="">
        <div class="rob-form-group rob-col-lg-7">
            <div class="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
                <label for="inputEmail3" class="rob-input-label rob-input-require">dom层
                </label>
            </div>
            <div class="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
                <div class="rob-input-item">
                    <input type="text" class="rob-input ng-pristine ng-untouched ng-valid ng-empty"  id="inputEmail3" placeholder="请复制dom">
                </div>
            </div>
        </div>

        <div class="rob-form-group rob-col-lg-7">
          <div class="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label for="inputEmail3" class="rob-input-label rob-input-require">属性名:
              </label>
          </div>
          <div class="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <div class="rob-input-item">
                  <input type="text" class="rob-input ng-pristine ng-untouched ng-valid ng-empty" id="inputEmail3" placeholder="请复制属性名">
              </div>
          </div>
        </div>
        <div class="rob-form-group rob-col-lg-7">
          <div class="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label for="inputEmail3" class="rob-input-label rob-input-require">media:
              </label>
          </div>
          <div class="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <div class="rob-input-item">
                  <input type="text" class="rob-input ng-pristine ng-untouched ng-valid ng-empty" id="inputEmail3" placeholder="media">
              </div>
          </div>
        </div>
        <div class="rob-col-lg-3 rob-col-md-6 rob-col-sm-24 rob-col-xs-24">
            <button class="rob-btn rob-btn-default rob-btn-block" data-target="search">
                搜索
            </button>
        </div>
      </div>
    `
    componentVariate = componentVariate.vars
    componentVariate.forEach((item) => {
      html += `
        <div class="rob-col-lg-8 rob-col-xs-8">
          <textarea class="rob-col-lg-24 textareaClass"  readonly>${item.key}</textarea>
          <!-- 变量名 -->
          <textarea class="rob-col-lg-24 textareaClass" style="color:#d9534f"  readonly>${item.desc}</textarea>
          <!-- 变量备注 -->
          <div class="rob-input-item">
            <input type="text" class="rob-input" data-event="${dataEvent}" data-key="${item.key}" data-componentName="${componentName}Vars" value="${item.value}" id="inputEmail3" placeholder="请输入姓名">
            <!-- 变量的值 -->
          </div>
        </div>
      `
    })
    html += '</div>'
    viewDom.html(html)
  }

  // $menuFTrob-sidebar-menu-3CPCliCPCTsub-menuCPCliCPCTsub-menuCPCliCPCaFAmediaCUmax-widthWC768pxVFfont-size
  function render(dom) {
    let componentName = $(dom).find('[name="robot-component"]').val();
    let componentVariate = $scope.variateConfig[`${componentName}Vars`]
    let parent = $(dom);
    parent.siblings('.ui-draggable').find('.rob-form-group').html('')
    let viewDom = parent.find('.demoVas')
    let _html = viewDom.html() || ''
    componentVariate = componentVariate.vars
    let _componentVariate = componentVariate
    if ($scope.domValue && $scope.filterValuePropName && !$scope.filterValueMediaName) {
      _componentVariate = componentVariate.filter(item => item.key === `${$scope.filterValueComponentName}F${$scope.filterValuePropName}`)
    } else if (!$scope.filterValueMediaName && ($scope.domValue || $scope.filterValuePropName)) {
      _componentVariate = componentVariate.filter(item => item.key.includes($scope.filterValueComponentName))
      _componentVariate = _componentVariate.filter(item => item.key.includes($scope.filterValuePropName))
    } else if ($scope.filterValueMediaName && $scope.domValue && $scope.filterValuePropName) {
      _componentVariate = componentVariate.filter(item => item.key === `${$scope.filterValueComponentName}F${$scope.filterValueMediaName}F${$scope.filterValuePropName}`)
    } else {
      _componentVariate = componentVariate.filter(item => item.key.includes($scope.filterValueMediaName))
      _componentVariate = _componentVariate.filter(item => item.key.includes($scope.filterValuePropName))
      _componentVariate = _componentVariate.filter(item => item.key.includes($scope.filterValueComponentName))
    }



    let classes = 'varsList-lg';
    !viewDom.find('.varsList').hasClass(classes) && (classes = '')
    let html = `<div class="varsList ${classes}" ><i class="rob-icon-delete"></i><i class="rob-icon-upload"></i>`
    html += `
    <div class="">
      <div class="rob-form-group rob-col-lg-7">
          <div class="rob-col-lg-6 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 ">
              <label for="inputEmail3" class="rob-input-label rob-input-require">dom层
              </label>
          </div>
          <div class="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24">
              <div class="rob-input-item">
                  <input type="text" value="${$scope.domValue}" class="rob-input ng-pristine ng-untouched ng-valid ng-empty"  id="inputEmail3" placeholder="请复制dom">
              </div>
          </div>
      </div>

      <div class="rob-form-group rob-col-lg-7">
        <div class="rob-col-lg-6 rob-col-md-4 rob-col-sm-24 rob-col-xs-24 ">
            <label for="inputEmail3" class="rob-input-label rob-input-require">属性名:
            </label>
        </div>
        <div class="rob-col-lg-16 rob-col-md-16 rob-col-sm-24 rob-col-xs-24">
            <div class="rob-input-item">
                <input type="text" value="${$scope.__propValue}" class="rob-input ng-pristine ng-untouched ng-valid ng-empty" id="inputEmail3" placeholder="请复制属性名">
            </div>
        </div>
        </div>

        <div class="rob-form-group rob-col-lg-7">
          <div class="rob-col-lg-6 rob-col-md-6 rob-col-sm-24 rob-col-xs-24 ">
              <label for="inputEmail3" class="rob-input-label rob-input-require">media:
              </label>
          </div>
          <div class="rob-col-lg-18 rob-col-md-18 rob-col-sm-24 rob-col-xs-24">
              <div class="rob-input-item">
                  <input type="text" class="rob-input ng-pristine ng-untouched ng-valid ng-empty" value="${$scope.__mediaValue}" id="inputEmail3" placeholder="media">
              </div>
          </div>
        </div>


        <div class="rob-col-lg-3 rob-col-md-6 rob-col-sm-24 rob-col-xs-24">
            <button class="rob-btn rob-btn-default rob-btn-block" data-target="search">
                搜索
            </button>
        </div>
    </div>
    `


    _componentVariate.forEach((item) => {
      html += `
        <div class="rob-col-lg-8 rob-col-xs-8">
          <textarea class="rob-col-lg-24 textareaClass"  readonly>${item.key}</textarea>
          <!-- 变量名 -->
          <textarea class="rob-col-lg-24 textareaClass" style="color:#d9534f"  readonly>${item.desc}</textarea>
          <!-- 变量备注 -->
          <div class="rob-input-item">
            <input type="text" class="rob-input" data-event="${dataEvent}" data-key="${item.key}" data-componentName="${componentName}Vars" value="${item.value}" id="inputEmail3" placeholder="请输入姓名">
            <!-- 变量的值 -->
          </div>
        </div>
      `
    })
    html += "</div>"
    viewDom.html(html)
  }




});
