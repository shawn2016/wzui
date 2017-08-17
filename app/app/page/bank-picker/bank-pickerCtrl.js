/*
creat by shawn 2017-3-12
 */
define(['appregister', 'assets/js/iosSelect','assets/js/bank'], function(app, IosSelect) {
    app.controller('bank-pickerCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
        var showBankDom = document.querySelector('#showBank');
        var bankIdDom = document.querySelector('#bankId');
        showBankDom.addEventListener('click', function() {

            var bankId = showBankDom.dataset['id'];
            var bankName = showBankDom.dataset['value'];
            var bankSelect = new IosSelect(1, [data], {
                container: '.container',
                title: '银行卡选择',
                itemHeight: 50,
                itemShowCount: 3,
                showLoading:true,
                oneLevelId: bankId,
                callback: function(selectOneObj) {
                    bankIdDom.value = selectOneObj.id;
                    showBankDom.innerHTML = selectOneObj.value;
                    showBankDom.dataset['id'] = selectOneObj.id;
                    showBankDom.dataset['value'] = selectOneObj.value;
                }
            });
        });
    }])
})