/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/clipboard/clipboard', 'customize'], function(app, Clipboard) {
    app.controller('customizeCtrl', ['$scope', '$http', '$state', '$location', '$anchorScroll', function($scope, $http, $state, $location, $anchorScroll) {
        /*
        暴露所有方法
         */



        $scope.hideCode = false;
        $scope.cssCopyState = true;

        $scope.goId = goId; //当前页面导航
        $scope.startGo = startGo; //开始构建
        $scope.checkCssFun = checkCssFun; //选择scss文件
        $scope.addScss = addScss; //添加scss文件
        $scope.isAllCheck = isAllCheck;
        $scope.isAllCssCheck = isAllCssCheck;
        $scope.fast = fast;
        $scope.showAll = showAll;
        $scope.hideAllCode = false;
        $scope.domTransFunc = domTransFunc;
        $scope.varsFunction = varsFunction;
        $scope.copyVars = copyVars;
        $scope.classListTo = classListTo;
        $scope.copyVars2 = copyVars2;
        $scope.loading4 = false;



        $scope.varName = "请先合并！"
        $scope.newClassList = '请先输入变量';



        function classListTo() {
            $scope.classList = $scope.classList;
            var strN = "";
            var classListArray = $scope.classList.split(';');

            var NewClassListArray = [];
            for (var i = 0; i < classListArray.length - 1; i++) {
                classListArray[i] = classListArray[i].replace(/[\r\n]/g, "");
                NewClassListArray.push("//" + classListArray[i] + ';\n');
                NewClassListArray.push(classListArray[i] + ';\n');
            }
            for (var i = 0; i < NewClassListArray.length; i++) {
                strN += NewClassListArray[i]
            }
            $scope.newClassList = strN;
        }

        function domTransFunc(type) {
            if (type === 'dom') {
                var domStr = $scope.domTrans;
                if ($scope.pcWidth) {
                    domStr += 'F' + $scope.pcWidth;
                }
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
                var newDomStr = domStr
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
                $scope.varsTrans = newDomStr;
            } else {
                var domStr = $scope.varsTrans;
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
                var regV = /A/g; // ）
                var regG = /G/g; // ^
                var regS = /S/g; // *

                var newDomStr = domStr
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

                if (newDomStr.indexOf('F')) {
                    $scope.domTrans = (newDomStr.split('F'))[0];
                } else {
                    $scope.domTrans = newDomStr;
                }
            }
        }

        function varsFunction() {
            if (!$scope.domTrans) {
                alert('dom层不能为空');
                return false;
            } else {
                $scope.domTransFunc('dom');
            }
            if ($scope.componentName && $scope.varsTrans && $scope.propertyName) {
                $scope.varName = '$' + $scope.componentName + 'F' + $scope.varsTrans + 'F' + $scope.propertyName;
            } else {
                alert('组件名 变量名 属性名 都不能为空！');
                return false;
            }
        }

        function copyVars() {
            if ($scope.varName != '请先合并！') {
                var clipboard = new Clipboard('#varsNameId');
                clipboard.on('success', function(e) {
                    alert('复制成功');
                    clipboard.destroy();
                });

                clipboard.on('error', function(e) {
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);
                });
            } else {
                alert('组件名 变量名 属性名 都不能为空！');
                return false;
            }
        }

        function copyVars2() {
            if ($scope.newClassList != '请先输入变量') {
                var clipboard = new Clipboard('#newClassList');
                clipboard.on('success', function(e) {
                    alert('复制成功');
                    clipboard.destroy();
                });

                clipboard.on('error', function(e) {
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);
                });
            } else {
                alert('组件名 变量名 属性名 都不能为空！');
                return false;
            }
        }




        Array.prototype.unique3 = function() {
            var res = [];
            var json = {};
            for (var i = 0; i < this.length; i++) {
                if (!json[this[i]]) {
                    res.push(this[i]);
                    json[this[i]] = 1;
                }
            }
            return res;
        }

        Array.prototype.contains = function(obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function fast() {
            var localStorageString2;
            var localStorageString;
            var localStorageData;
            var localStorageData2;
            if (localStorage.getItem("layoutdata2") != null) {
                localStorageString = localStorage.getItem("layoutdata2");
                localStorageData = JSON.parse(localStorageString);
                if (localStorage.getItem("configJson") != null) {
                    localStorageString2 = localStorage.getItem("configJson");
                    localStorageData2 = JSON.parse(localStorageString2);
                    $scope.configJson.varsCopy = localStorageData2.varsCopy;
                }
            } else {
                alert('请打开可视化布局进行拖拽，再来快速定制！');
                return false;
            }







            var classArray = [];

            var classList = localStorageData.split('class="');
            for (var j = 1; j < classList.length; j++) {
                var classString = classList[j].split('"');

                var classString2 = classString[0].split(' ');
                // console.log(classString2);
                for (var z = 0; z < classString2.length; z++) {
                    if (classString2[z]) {
                        classArray.push(classString2[z]);
                    }
                }
            }


            //添加默认
            classArray.push('rob-grid');
            console.log(classArray.unique3());
            var s = /^rob-/;
            var classNewArray = [];
            for (var i = 0; i < classArray.unique3().length; i++) {
                if (s.test(classArray.unique3()[i])) {
                    classNewArray.push(classArray.unique3()[i].substr(4));
                }
            }
            // console.log(classNewArray);
            for (var i = 0; i < $scope.configJson.cssCopy.length; i++) {
                $scope.configJson.cssCopy[i].isCheck = false;
                isAllCheck($scope.configJson.cssCopy[i].id, false);
                if ($scope.configJson.cssCopy[i].components) {
                    for (var i1 = 0; i1 < $scope.configJson.cssCopy[i].components.length; i1++) {
                        if ($scope.configJson.cssCopy[i].components[i1].value) {
                            if (classNewArray.contains($scope.configJson.cssCopy[i].components[i1].value.split('/')[$scope.configJson.cssCopy[i].components[i1].value.split('/').length - 1])) {
                                $scope.configJson.cssCopy[i].components[i1].isCheck = true;
                                checkCssFun($scope.configJson.cssCopy[i].components[i1].value);
                                for (var i2 = 0; i2 < $scope.configJson.cssCopy[i].components[i1].arrayList.length; i2++) {
                                    if ($scope.configJson.cssCopy[i].components[i1].arrayList[i2].value) {
                                        if (classNewArray.contains($scope.configJson.cssCopy[i].components[i1].arrayList[i2].value.split('/')[$scope.configJson.cssCopy[i].components[i1].arrayList[i2].value.split('/').length - 1])) {
                                            $scope.configJson.cssCopy[i].components[i1].arrayList[i2].isCheck = true;
                                            checkCssFun($scope.configJson.cssCopy[i].components[i1].arrayList[i2].value);
                                            for (var i3 = 0; i3 < $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList.length; i3++) {
                                                if ($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].value) {
                                                    if (classNewArray.contains($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].value.split('/')[$scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].value.split('/').length - 1])) {
                                                        $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].isCheck = true;
                                                        checkCssFun($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].value);
                                                        for (var i4 = 0; i4 < $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList.length; i4++) {
                                                            if ($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].value) {
                                                                if (classNewArray.contains($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].value.split('/')[$scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].value.split('/').length - 1])) {
                                                                    $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].isCheck = true;
                                                                    checkCssFun($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].value);
                                                                    for (var i5 = 0; i5 < $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList.length; i5++) {
                                                                        if ($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList[i5].value) {
                                                                            if (classNewArray.contains($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList[i5].value.split('/')[$scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList[i5].value.split('/').length - 1])) {
                                                                                $scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = true;
                                                                                checkCssFun($scope.configJson.cssCopy[i].components[i1].arrayList[i2].arrayList[i3].arrayList[i4].arrayList[i5].value);

                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }

                                                        }
                                                    }
                                                }

                                            }
                                        }
                                    }


                                }
                            }
                        }


                    }
                }


            }





        }




        //上传文件
        $('#import-file-select').on('change', handleConfigFileSelect)
        var supportsFile = window.File && window.FileReader && window.FileList && window.Blob;
        var $importDropTarget = $('#import-drop-target');


        if (supportsFile) {
            $importDropTarget
                .on('dragover', handleConfigDragOver)
                .on('drop', handleConfigFileSelect)
        }

        function handleConfigDragOver(e) {
            e.stopPropagation()
            e.preventDefault()
            e.originalEvent.dataTransfer.dropEffect = 'copy'

        }



        function handleConfigFileSelect(e) {
            e.stopPropagation()
            e.preventDefault()
            if (e.type === "change") {
                var file = e.originalEvent.hasOwnProperty('dataTransfer') ? e.originalEvent.dataTransfer.files[0] : e.originalEvent.target.files[0]
            } else if (e.type === "drop") {
                var file = e.originalEvent.hasOwnProperty('dataTransfer') ? e.originalEvent.dataTransfer.files[0] : e.originalEvent.dataTransfer.files[0]

            }
            var reader = new FileReader()
            reader.onloadend = function(e) {
                var text = e.target.result;
                $scope.configJson = JSON.parse(text);
                $scope.$apply();
                alert("更新config.json");
            }

            reader.readAsText(file, 'utf-8')
        }

        function isAllCssCheck(id) {
            if (id === 'cssCopy') {
                for (var i = 0; i < $scope.configJson.cssCopy.length; i++) {
                    $scope.configJson.cssCopy[i].isCheck = !$scope.configJson.cssCopy[i].isCheck;
                    isAllCheck($scope.configJson.cssCopy[i].id, $scope.configJson.cssCopy[i].isCheck)
                }
            }
        }

        //获取json变量
        $http.get('../config.json').success(function(data) {
            $scope.configJson = data;
            console.log(data);
        })

        function addScss() {

            $http.post('../config.json', $scope.configJson).success(function() {
                console.log('添加成功');
            }).error(function(data) {});
        }

        //变量格式化
        function varsFormat() {
            for (var i = 0; i < $scope.configJson.varsCopy.length; i++) {
                for (var j = 0; j < $scope.configJson.varsCopy[i].vars.length; j++) {
                    $scope.configJson.vars[$scope.configJson.varsCopy[i].vars[j].key] = $scope.configJson.varsCopy[i].vars[j].value;
                }
            }
        }
        $scope.showCode = function(type) {
            $scope.hideCode = !$scope.hideCode;
            if ($scope.hideCode) {
                $('#' + type).slideDown();
            } else {
                $('#' + type).slideUp();
            }
        }
        //css组件  全选
        function isAllCheck(id, state) {
            for (var i = 0; i < $scope.configJson.cssCopy.length; i++) {
                if ($scope.configJson.cssCopy[i].components && id === $scope.configJson.cssCopy[i].id) {
                    for (var i2 = 0; i2 < $scope.configJson.cssCopy[i].components.length; i2++) {
                        $scope.configJson.cssCopy[i].components[i2].isCheck = state;
                        if ($scope.configJson.cssCopy[i].components[i2].arrayList) {
                            for (var i3 = 0; i3 < $scope.configJson.cssCopy[i].components[i2].arrayList.length; i3++) {
                                $scope.configJson.cssCopy[i].components[i2].arrayList[i3].isCheck = state;
                                if ($scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList) {
                                    for (var i4 = 0; i4 < $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList.length; i4++) {
                                        $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].isCheck = state;
                                        if ($scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList) {
                                            for (var i5 = 0; i5 < $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList.length; i5++) {
                                                $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList[i4].arrayList[i5].isCheck = state;
                                                if ($scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList) {
                                                    for (var i6 = 0; i6 < $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList.length; i6++) {
                                                        $scope.configJson.cssCopy[i].components[i2].arrayList[i3].arrayList[i4].arrayList[i4].arrayList[i6].isCheck = state;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //时间格式化
        Date.prototype.pattern = function(fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份         
                "d+": this.getDate(), //日         
                "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
                "H+": this.getHours(), //小时         
                "m+": this.getMinutes(), //分         
                "s+": this.getSeconds(), //秒         
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
                "S": this.getMilliseconds() //毫秒         
            };
            var week = {
                "0": "周日",
                "1": "周一",
                "2": "周二",
                "3": "周三",
                "4": "周四",
                "5": "周五",
                "6": "周六"
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            if (/(E+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        }

        function showAll(type) {
            if (type === 'css') {
                $scope.hideAllCode = !$scope.hideAllCode;
                for (var i = 0; i < $scope.configJson.cssCopy.length; i++) {
                    if ($scope.hideAllCode) {
                        $('#' + $scope.configJson.cssCopy[i].id).slideDown();
                    } else {
                        $('#' + $scope.configJson.cssCopy[i].id).slideUp();
                    }
                }
            }


        }
        //css单选
        function checkCssFun(id) {
            for (var i1 = 0; i1 < $scope.configJson.cssCopy.length; i1++) {
                if ($scope.configJson.cssCopy[i1].components) { //是否有组件
                    for (var i2 = 0; i2 < $scope.configJson.cssCopy[i1].components.length; i2++) {
                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList) { //二级
                            for (var i3 = 0; i3 < $scope.configJson.cssCopy[i1].components[i2].arrayList.length; i3++) {
                                if (id === $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].value && $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck) {
                                    $scope.configJson.cssCopy[i1].components[i2].isCheck = true;
                                }
                                //去掉一级的时候
                                if (!$scope.configJson.cssCopy[i1].components[i2].isCheck) {
                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = false;
                                }
                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList) { //三级
                                    for (var i4 = 0; i4 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList.length; i4++) {
                                        if (id === $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].value && $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck) {
                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].parentId) {
                                                $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = true;
                                            }
                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].parentId) {
                                                $scope.configJson.cssCopy[i1].components[i2].isCheck = true;
                                            }
                                        }
                                        //去掉一级的时候
                                        if (!$scope.configJson.cssCopy[i1].components[i2].isCheck) {
                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = false;
                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                        }
                                        //去掉二级的时候
                                        if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck) {
                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                        }
                                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList) { //四级
                                            for (var i5 = 0; i5 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList.length; i5++) {
                                                if (id === $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].value && $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck) {
                                                    if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].parentId) {
                                                        $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = true;
                                                    }
                                                    if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].parentId) {
                                                        $scope.configJson.cssCopy[i1].components[i2].isCheck = true;
                                                    }
                                                    if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId) {
                                                        $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = true;
                                                    }
                                                }
                                                //去掉一级的时候
                                                if (!$scope.configJson.cssCopy[i1].components[i2].isCheck) {
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = false;
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                }
                                                //去掉二级的时候
                                                if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck) {
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                }
                                                //去掉三级的时候
                                                if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck) {
                                                    $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                }
                                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList) { //五级
                                                    for (var i6 = 0; i6 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList.length; i6++) {
                                                        if (id === $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].value && $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].isCheck) {
                                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].parentId) {
                                                                $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = true;
                                                            }
                                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId == $scope.configJson.cssCopy[i1].components[i2].parentId) {
                                                                $scope.configJson.cssCopy[i1].components[i2].isCheck = true;
                                                            }
                                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].parentId) {
                                                                $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = true;
                                                            }
                                                            if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].parentId == $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].parentId) {
                                                                $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = true;
                                                            }
                                                        }
                                                        //去掉一级的时候
                                                        if (!$scope.configJson.cssCopy[i1].components[i2].isCheck) {
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].isCheck = false;
                                                        }
                                                        //去掉二级的时候
                                                        if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck) {
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].isCheck = false;
                                                        }

                                                        //去掉三级的时候
                                                        if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck) {
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck = false;
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].isCheck = false;
                                                        }
                                                        //去掉四级的时候
                                                        if (!$scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck) {
                                                            $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].isCheck = false;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        //数组注入一个方法
        Array.prototype.contains = function(obj) {
            var i = this.length;
            while (i--) {
                if (this[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        //css组件整理
        function addCssFun() {
            $scope.configJson.css = [];
            for (var i1 = 0; i1 < $scope.configJson.cssCopy.length; i1++) {
                if ($scope.configJson.cssCopy) {
                    for (var i2 = 0; i2 < $scope.configJson.cssCopy[i1].components.length; i2++) {

                        if ($scope.configJson.cssCopy[i1].components[i2].isCheck) {
                            if (!$scope.configJson.css.contains($scope.configJson.cssCopy[i1].components[i2].value)) {
                                $scope.configJson.css.push($scope.configJson.cssCopy[i1].components[i2].value); //一级
                            }
                        }
                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList) {
                            for (var i3 = 0; i3 < $scope.configJson.cssCopy[i1].components[i2].arrayList.length; i3++) {
                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].isCheck) {
                                    if (!$scope.configJson.css.contains($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].value)) {
                                        $scope.configJson.css.push($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].value); //二级
                                    }

                                }

                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList) {
                                    for (var i4 = 0; i4 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList.length; i4++) {
                                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].isCheck) {
                                            if (!$scope.configJson.css.contains($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].value)) {
                                                $scope.configJson.css.push($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].value); //三级

                                            }
                                        }
                                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList) {
                                            for (var i5 = 0; i5 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList.length; i5++) {
                                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].isCheck) {
                                                    if (!$scope.configJson.css.contains($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].value)) {
                                                        $scope.configJson.css.push($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].value); //四级
                                                    }
                                                }
                                                if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList) {
                                                    for (var i6 = 0; i6 < $scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList.length; i6++) {
                                                        if ($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i6].arrayList[i6].isCheck) {
                                                            if (!$scope.configJson.css.contains($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].value)) {
                                                                $scope.configJson.css.push($scope.configJson.cssCopy[i1].components[i2].arrayList[i3].arrayList[i4].arrayList[i5].arrayList[i6].value); //五级
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                }

            }
        }
        //构建按钮
        function startGo() {
            $scope.loading4 = true;
            $scope.configJson.css = [];
            varsFormat(); //css整理
            var date = new Date();
            $scope.configJson.time = date.pattern("yyyy-MM-dd hh:mm:ss");
            addCssFun(); //css组件整理
            console.log($scope.configJson);
            console.log('正在构建8888.');
            $http.post('http://localhost:8081/api/tasks', $scope.configJson).success(function(data, header, config, status) {
             if(data.success){
               console.log('0000000000');
                location = "http://localhost:8081/api/tasks";
              $scope.loading4=false;
             }else{
              $scope.loading4=false;
             alert('构建失败！');
             }

            }).error(function(data, header, config, status) {
              alert('构建失败！');
               $scope.loading4=false;
            });

        }







        function goId(n) {
            $scope.state = n;
            $location.hash(n);
            $anchorScroll();
        }

        function all() {

        }


    }])
})