define([], function () {
/*
* 定义angularJS 初始化之前配置好的路由
* */
    var ret = [
        {state:"login",url:"./modules/home/login.html",ctrl:"./modules/home/loginCtrl"},
    ];
    return ret;
})