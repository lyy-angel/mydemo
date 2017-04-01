/*
    讲师列表
*/
define(['jquery','template'],function($,template){
    // 查询讲师的数据列表
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            if(data.code == 200){
                // 渲染讲师列表
                var html = template('teacherTpl',{list : data.result});
                $('#teacherList').html(html);
            }
        }
    });
});