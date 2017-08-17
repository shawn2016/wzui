/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/iosSelect', 'assets/js/areaData_v2'], function(app, IosSelect) {
    app.controller('area-pickerCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        // 静态文件
        var selectContactDom = $('#select_contact');
        var showContactDom = $('#show_contact');
        var contactProvinceCodeDom = $('#contact_province_code');
        var contactCityCodeDom = $('#contact_city_code');
        selectContactDom.bind('click', function() {
            var sccode = showContactDom.attr('data-city-code');
            var scname = showContactDom.attr('data-city-name');

            var oneLevelId = showContactDom.attr('data-province-code');
            var twoLevelId = showContactDom.attr('data-city-code');
            var threeLevelId = showContactDom.attr('data-district-code');
            var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys], {
                title: '地址选择',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                headerDirection: "bottom",
                threeLevelId: threeLevelId,
                callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
                    contactProvinceCodeDom.val(selectOneObj.id);
                    contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                    contactCityCodeDom.val(selectTwoObj.id);
                    contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                    showContactDom.attr('data-province-code', selectOneObj.id);
                    showContactDom.attr('data-city-code', selectTwoObj.id);
                    showContactDom.attr('data-district-code', selectThreeObj.id);
                    showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                }
            });
        });
        // ajax方式
        var areaData1 = function(callback) { // callback为回调函数
            $.ajax({
                url: 'https://test-isemail.rhcloud.com/area.php',
                dataType: 'json',
                success: function(data, textStatus) {
                    callback(data);
                },
            });
        }

        var areaData2 = function(province, callback) { // province为已经选中的省份ID,callback为回调函数
            $.ajax({
                url: 'https://test-isemail.rhcloud.com/area.php?province=' + province,
                dataType: 'json',
                success: function(data, textStatus) {
                    callback(data);
                },
            });
        }

        var areaData3 = function(province, city, callback) { // province为已经选中的省份ID,city为已经选中的城市ID,callback为回调函数
            $.ajax({
                url: 'https://test-isemail.rhcloud.com/area.php?province=' + province + '&city=' + city,
                dataType: 'json',
                success: function(data, textStatus) {
                    callback(data);
                },
            });
        }
        var selectContactDom1 = $('#select_contact1');
        var showContactDom1 = $('#show_contact1');
        var contactProvinceCodeDom1 = $('#contact_province_code1');
        var contactCityCodeDom1 = $('#contact_city_code1');
        selectContactDom1.bind('click', function() {
            var sccode1 = showContactDom1.attr('data-city-code');
            var scname1 = showContactDom1.attr('data-city-name');
            var oneLevelId1 = showContactDom1.attr('data-province-code');
            var twoLevelId1 = showContactDom1.attr('data-city-code');
            var threeLevelId1 = showContactDom1.attr('data-district-code');
            var iosSelect1 = new IosSelect(3, [areaData1, areaData2, areaData3], {
                title: '地址选择',
                itemHeight: 35,
                relation: [1, 1, 0, 0],
                oneLevelId: oneLevelId1,
                twoLevelId: twoLevelId1,
                threeLevelId: threeLevelId1,
                showLoading: true,
                callback: function(selectOneObj1, selectTwoObj1, selectThreeObj1) {
                    contactProvinceCodeDom1.val(selectOneObj1.id);
                    contactProvinceCodeDom1.attr('data-province-name', selectOneObj1.value);
                    contactCityCodeDom1.val(selectTwoObj1.id);
                    contactCityCodeDom1.attr('data-city-name', selectTwoObj1.value);
                    showContactDom1.attr('data-province-code', selectOneObj1.id);
                    showContactDom1.attr('data-city-code', selectTwoObj1.id);
                    showContactDom1.attr('data-district-code', selectThreeObj1.id);
                    showContactDom1.html(selectOneObj1.value + ' ' + selectTwoObj1.value + ' ' + selectThreeObj1.value);
                }
            });
        });
    }])
})