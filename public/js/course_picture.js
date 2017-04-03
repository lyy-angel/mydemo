/*
    课程封面
*/
define(['jquery','template','util','uploadify','jcrop','validate','form'],function($,template,util){
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

            var instance = null;

            // 实现图片裁切功能
            function cropPicture(){
                // 把原来的图片裁切实例销毁
                instance && instance.destroy();
                // 重新实例化图片裁切实例
                $('.content .picture img').Jcrop({
                    aspactRatio : 1
                },function(){
                    instance = this;
                    // 这里的this是图片裁切的一个实例对象
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    var x = 0;
                    var y = height/4;
                    // 手动创建选区
                    this.newSelection();
                    this.setSelect([x,y,width,height/2]);
                });
            }

            $('.content .preview').on('cropmove cropend',function(a,b,c){
                $('#x').val(c.x);
                $('#y').val(c.y);
                $('#w').val(c.w);
                $('#h').val(c.h);
            });

            // 裁切按钮绑定事件
            $('#cropbtn').click(function(){
                // 图片裁切
                if($('#cropbtn').attr('data-flag') == 'save'){
                    // 提交裁切参数
                    $('#cropInfo').ajaxSubmit({
                        type : 'post',
                        url : '/api/course/update/picture',
                        data : {cs_id : cs_id},
                        success : function(data){
                            if(data.code == 200){
                                location.href = '/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                }else{
                    // 裁切图片
                    cropPicture();
                    $('#cropbtn').attr('data-flag','save').val('保存图片');
                }
            });
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
                    // 裁切图片

                }
            });
        }
    });



});