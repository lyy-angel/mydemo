define(['jquery','cookie'],function($){
    // 控制左侧导航菜单的折叠
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    // 验证用户是否登录
    var pathname = location.pathname;
    if(!$.cookie('PHPSESSID') && pathname != '/login' && pathname != '/'){
        location.href = '/login';
    }
});
