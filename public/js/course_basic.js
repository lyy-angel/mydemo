/*
    课程基本信息
*/
define(['jquery','template','util'],function($,template,util){
    // 选中导航菜单
    util.setMenu('/course/add');
    // 获取课程id
    var cs_id = util.getId('cs_id');
    // 查询课程基本信息
    $.ajax({
        type : 'get',
        url : '/api/course/basic',
        data : {cs_id:cs_id},
        dataType : 'json',
        success : function(data){
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);
        }
    });

});