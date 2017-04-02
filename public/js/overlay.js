/*
    遮罩效果
*/
define(['jquery'],function($){
    // Ajax请求开始的时候触发
    $(document).ajaxStart(function () {
        $('.overlay').show();
    });
    // Ajax请求结束的时候触发
    $(document).ajaxStop(function () {
        setTimeout(function(){
            $('.overlay').hide();
        },500);
    });
});