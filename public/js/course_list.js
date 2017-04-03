/*
    课程列表
*/
define(['jquery','util','template'],function($,util,template){
    // 选中导航菜单
    util.setMenu('/course/list');
    // 加载列表数据
    $.ajax({
        type : 'get',
        url : '/api/course',
        dataType : 'json',
        success : function(data){
            var html = template('courseTpl',{list : data.result});
            $('#courseInfo').html(html);
        }
    });
});