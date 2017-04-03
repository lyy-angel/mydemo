/*
    工具模块
*/
define(['jquery'],function($){
    return {
        getId : function(key){
            var params = location.search.substr(1);
            if(params){
                var arr = params.split('&');
                if(arr.length > 0){
                    for (var i = 0; i < arr.length; i++) {
                        var kv = arr[i].split('=');
                        if(kv[0] === key){
                            return kv[1];
                        }
                    }
                }
            }
        },
        setMenu : function(path){
            $('.navs a[href="'+path+'"]')
            .addClass('active')
            .closest('ul')
            .show();
        }
    }
});