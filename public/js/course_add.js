/*
    添加课程
*/
define(['jquery','template','util','validate','form'],function($,template,util){

    // 选中导航菜单
    util.setMenu('/course/add');

    // 表单验证
    $('#courseForm').validate({
        sendForm : false,
        valid : function(){
            $(this).ajaxSubmit({
                type : 'post',
                url : '/api/course/create',
                dataType : 'json',
                success : function(data){
                    if(data.code == 200){
                        location.href = '/course/basic?cs_id=' + data.result.cs_id;
                    }
                }
            });
        }
    });

});