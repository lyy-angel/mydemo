/*
    讲师列表
*/
define(['jquery','template'],function($,template){
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
            }
        }
    });

    
});