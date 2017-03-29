// 控制左侧导航菜单的折叠
$('.navs ul').prev('a').on('click', function () {
	$(this).next().slideToggle();
});

$('#loginForm').submit(function(){
    // 获取表单数据
    var formData = $(this).serialize();
    // 调用接口
    $.ajax({
        type : 'post',
        url : '/api/login',
        data : formData,
        dataType : 'json',
        success : function(data){
            // var tc_avater = data.result.tc_avater;
            // var tc_name = data.result.tc_name;
            // cookie可以实现页面间的数据共享
            if(data.code == 200){
                location.href = '/index/index';
            }
        }
    });
    
    // jQuery中的return false既可以阻止默认行为，也可以阻止冒泡
    // 原生js中的return false只能阻止默认行为，不能阻止冒泡
    return false;
});