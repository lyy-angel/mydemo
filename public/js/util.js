/*
    工具模块
*/
define([],function(){
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
        }
    }
});