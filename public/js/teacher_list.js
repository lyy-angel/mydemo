/*
    讲师列表
*/
define(['jquery','template','util','bootstrap','overlay'],function($,template,util){
    // 选中导航菜单
    util.setMenu(location.pathname);
    
    // 查询讲师的数据列表
    $.ajax({
        type : 'get',
        url : '/api/teacher',
        dataType : 'json',
        success : function(data){
            if(data.code == 200){
                // 渲染讲师列表
                var html = template('teacherTpl',{list : data.result});
                $('#teacherList').html(html);
                // 绑定注销和启用讲师的按钮
                $('.ecteacher').click(function(){
                    // 这里的this就是当前点击的按钮
                    var td = $(this).parent('td');
                    var tc_id = td.attr('data-tcId');
                    var tc_status = td.attr('data-status');
                    var that = this;
                    $.ajax({
                        type : 'post',
                        data : {tc_id:tc_id,tc_status:tc_status},
                        url : '/api/teacher/handle',
                        dataType : 'json',
                        success : function(data){
                            if(data.code == 200){
                                // 更新页面的点击的讲师状态
                                td.attr('data-status',data.result.tc_status);
                                // 修改讲师当前的状态内容
                                if(data.result.tc_status == 0){
                                    $(that).html('启 用');
                                }else{
                                    $(that).html('注 销');
                                }
                            }
                        }
                    });
                });
                // 点击查看讲师详细信息
                $('.preview').click(function(){
                    // 获取要查询的讲师id
                    var tc_id = $(this).closest('td').attr('data-tcId');
                    // 发送查询请求
                    $.ajax({
                        type : 'get',
                        url : '/api/teacher/view',
                        data : {tc_id : tc_id},
                        dataType : 'json',
                        success : function(data){
                            // 去掉地区之间的竖线
                            // data.result.tc_hometown = data.result.tc_hometown.replace(/\|/g,' ');
                            data.result.tc_hometown = data.result.tc_hometown.split('|').join(' ');
                            // 渲染模板
                            var html = template('modalTpl',data.result);
                            $('#modalInfo').html(html);
                            // 显示弹窗
                            $('#teacherModal').modal();
                        }
                    });

                });

            }
        }
    });


    
});