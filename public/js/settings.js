/*
    个人中心
*/
define(['jquery','template','ckeditor','datepicker','language','region'],function($,template,CKEDITOR){

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
        }
    });
});