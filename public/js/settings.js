/*
    个人中心
*/
define(['jquery','template','ckeditor','util','datepicker','language','region','uploadify'],function($,template,CKEDITOR,util){
    // 选中导航菜单
    util.setMenu('/index/index');

    // 查询个人信息
    $.ajax({
        type : 'get',
        url : '/api/teacher/profile',
        dataType : 'json',
        success : function(data){
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
        }
    });
});