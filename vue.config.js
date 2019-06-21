
module.exports = {
    outputDir: 'dist',
    publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
    devServer: {
        host: 'localhost', // 设置主机地址
        open: false, // 是否自动打开浏览器页面
        port: 8080, // 端口地址
            // https: false, // 使用https提供服务
            // proxy: 'http://.com' // string | Object 代理设置
        // 设置代理
        proxy: {
            "/DataPortalRQ": {
                target: "http://42.56.90.221:8081",
                changeOrigin: true
            },
            "/feedbackInfoController": {
                target: "http://47.92.121.252:8080",
                changeOrigin: true
            },
            // "/testController": {
            //     target: "http://192.168.11.172:8081",
            //     changeOrigin: true
            // },
        }
    },
    
}
