
require.config({
    baseUrl : '/public/assets',
    paths : {
        jquery : 'jquery/jquery.min',
        cookie : 'jquery-cookie/jquery.cookie',
        bootstrap : 'bootstrap/js/bootstrap.min',
        echarts : 'echarts/echarts.min',
        nprogress : 'nprogress/nprogress',
        template : 'artTemplate/template'
    },
    shim : {
        bootstrap : {
            deps : ['jquery']
        }
    }
});