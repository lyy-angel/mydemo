/*
    添加讲师
*/
define(['jquery','template','util','validate','form','datepicker','language'],function($,template,util){

    // 选中导航菜单
    util.setMenu('/teacher/list');

    // 获取讲师id
    var tc_id = util.getId('tc_id');

    if(tc_id){
        // 编辑讲师
        // 根据讲师id查询讲师的详细信息
        $.ajax({
            type : 'get',
            data : {tc_id : tc_id},
            url : '/api/teacher/edit',
            dataType : 'json',
            success : function(data){
                data.result.manageInfo = '编辑讲师';
                var html = template('manageTpl',data.result);
                $('#manageInfo').html(html);
                checkForm('/api/teacher/update');
            }
        });
    }else{
        // 添加讲师
        var html = template('manageTpl',{
            manageInfo : '添加讲师',
            tc_gender : 0
        });
        $('#manageInfo').html(html);
        checkForm('/api/teacher/add');
    }
    // 验证表单并提交
    function checkForm(url){
        // 验证添加讲师表单
        $('#manageForm').validate({
            sendForm : false,
            valid : function(){
                // 提交表单
                $(this).ajaxSubmit({
                    url : url,
                    type : 'post',
                    success : function(data){
                        if(data.code == 200){
                            location.href = '/teacher/list'
                        }
                    }
                });
            },
            eachInvalidField : function(){
                $(this).closest('.form-group').removeClass('has-success').addClass('has-error');
            },
            eachValidField : function(){
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            },
            description : {
                name : {
                    required : '用户名不能为空',
                    valid : '用户名符合要求'
                },
                password : {
                    required : '密码不能为空',
                    pattern : '密码只能是6位数字',
                    valid : '密码符合要求'
                },
                date : {
                    required : '入职日期不能为空',
                    valid : '入职日期格式正确'
                }
            }
        });
    }
    
});