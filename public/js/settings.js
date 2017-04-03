/*
    个人中心
*/
define(['jquery','template','ckeditor','util','datepicker','language','region','uploadify','validate','form'],function($,template,CKEDITOR,util){
    // 选中导航菜单
    util.setMenu('/index/index');

    // 查询个人信息
    $.ajax({
        type : 'get',
        url : '/api/teacher/profile',
        dataType : 'json',
        success : function(data){
            // 渲染模板
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
            // 初始化区域下拉选项(必须在模板渲染完成后处理插件)
            $('#hometown').region({
                url : '/public/assets/jquery-region/region.json'
            });
            // 初始化富文本编辑器
            CKEDITOR.replace('editor',{
                toolbarGroups : [
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
                    { name: 'links' },
                    { name: 'insert' },
                    { name: 'forms' },
                    { name: 'tools' }
                ]
            });
            // 实现图片上传
            $('#upfile').uploadify({
                width : 120,
                height : 120,
                buttonText : '',
                itemTemplate : '<span></span>',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/avatar',
                fileObjName : 'tc_avatar',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    // 上传成功以后设置图片路径
                    $('.settings .preview img').attr('src',data.result.path);
                }
            });
            // 绑定表单提交事件
            $('#personForm').validate({
                sendForm : false,
                valid : function(){
                    // 拼接省市县数据
                    var p = $('#p option:selected').text();
                    var c = $('#c option:selected').text();
                    var d = $('#d option:selected').text();
                    var hometown = p + '|' + c + '|' + d;
                    // 实现富文本内容修改时数据的同步
                    for(var instance in CKEDITOR.instances){
                        CKEDITOR.instances[instance].updateElement();
                    }
                    // 实现表单提交
                    $(this).ajaxSubmit({
                        url : '/api/teacher/modify',
                        type : 'post',
                        data : {tc_hometown : hometown},
                        success : function(data){
                            if(data.code == 200){
                                // 更新成功后刷新页面
                                location.href = '/index/settings';
                            }
                        }
                    });
                }
            });
        }
    });
});