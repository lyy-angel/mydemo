/*
    课程基本信息
*/
define(['jquery','template','util','ckeditor','validate','form'],function($,template,util,CKEDITOR){
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
            // 渲染模板
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);
            // 初始化富文本编辑器
            CKEDITOR.replace('editor');
            // 绑定提交事件
            $('#basicForm').validate({
                sendForm:false,
                valid : function(){
                    // 处理富文本的修改操作
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    $(this).ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/basic',
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/course/picture?cs_id=' + data.result.cs_id;
                            }
                        }
                    });
                }
            });

        }
    });

});