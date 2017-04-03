
require.config({
    baseUrl : '/public/assets',
    paths : {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        bootstrap : 'bootstrap/js/bootstrap.min',
        echarts : 'echarts/echarts.min',
        nprogress : 'nprogress/nprogress',
        template : 'artTemplate/template',
        validate : 'validate/jquery-validate',
        form : 'jquery-form/jquery.form',
        region : 'jquery-region/jquery.region',
        datepicker : 'bootstrap-datepicker/js/bootstrap-datepicker',
        language : 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        ckeditor : 'ckeditor/ckeditor',
        uploadify : 'uploadify/jquery.uploadify',
        jcrop : 'jcrop/Jcrop.min',
        util : '../js/util',
        overlay : '../js/overlay'
    },
    shim : {
        bootstrap : {
            deps : ['jquery']
        },
        validate : {
            deps : ['jquery']
        },
        language : {
            deps : ['jquery','datepicker']
        },
        ckeditor : {
            deps : ['jquery'],
            exports : 'CKEDITOR'
        },
        uploadify : {
            deps : ['jquery']
        },
        jcrop : {
            deps : ['jquery']
        }
    }
});