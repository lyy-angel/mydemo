define(['jquery','template','nprogress','cookie'],function($,template,nprogress){
    // 设置页面加载进度条
    nprogress.start();
    nprogress.done();
    
    // 控制左侧导航菜单的折叠
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    // 验证用户是否登录
    var pathname = location.pathname;
    if(!$.cookie('PHPSESSID') && pathname != '/login' && pathname != '/'){
        location.href = '/login';
    }

    // 初始化登录成功信息
    var info = $.cookie('loginInfo');
    if(info){
        // 模板内容
        var tpl = '<div class="avatar img-circle">'+
                    '<img src="{{tc_avatar}}">'+
                  '</div>'+
                  '<h4>{{tc_name}}</h4>';
        // 数据
        info = JSON.parse(info);
        // 模板+数据->静态html片段
        var render = template.compile(tpl);
        var html = render(info);
        // 把静态html片段追加到页面
        $('.aside .profile').html(html);

        // $('.aside .profile img').attr('src',info.tc_avatar);
        // $('.aside .profile h4').html(info.tc_name);
    }
});
