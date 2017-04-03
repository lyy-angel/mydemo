/*
    课时管理
*/
define(['jquery','template','util'],function($,template,util){

    util.setMenu('/course/add');

    var cs_id = util.getId('cs_id');

    // 查询课时信息
    $.ajax({
        type : 'get',
        url : '/api/course/lesson',
        data : {cs_id : cs_id},
        dataType : 'json',
        success : function(data){
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
        }
    });
});