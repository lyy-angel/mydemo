/*
    课程封面
*/
define(['jquery','template','util','uploadify'],function($,template,util){
    // 选中菜单
    util.setMenu('/course/add');
    // 获取课程id
    var cs_id = util.getId('cs_id');
    // 查询封面信息
    $.ajax({
        type : 'get',
        url : '/api/course/picture',
        data : {cs_id : cs_id},
        success : function(data){
            // 渲染模板
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);
            // 上传图片
            $('#upfile').uploadify({
                height : 'auto',
                width : 100,
                buttonText : '文件上传',
                buttonClass : 'btn btn-success btn-sm',
                formData : {cs_id:cs_id},
                itemTemplate : '<span></span>',
                swf : '/public/assets/uploadify/uploadify.swf',
                uploader : '/api/uploader/cover',
                fileObjName : 'cs_cover_original',
                onUploadSuccess : function(file,data){
                    data = JSON.parse(data);
                    // 上传成功以后设置图片路径
                    $('.content .picture img').attr('src',data.result.path);
                }
            });
        }
    });



});