<?php 
    $path = 'index';
    $filename = 'index';

    // print_r($_SERVER);
    // 处理请求路径
    if(array_key_exists('PATH_INFO',$_SERVER)){
        $url = $_SERVER['PATH_INFO'];
        // teacher/list
        $arr = explode('/',substr($url,1));
        if(count($arr) == 2){
            $path = $arr[0];//路径
            $filename = $arr[1];//文件名称
        }else{
            $filename = 'login';
        }
    }else{
        $filename = 'login';
    }
    // 载入页面
    include('./view/'.$path.'/'.$filename.'.html');
 ?>