
module.exports = {
    outputDir: 'dist',
    devServer: {
        host: 'localhost', // 设置主机地址
        open: true, // 是否自动打开浏览器页面
        port: 8080, // 端口地址
            // https: false, // 使用https提供服务
            // proxy: 'http://.com' // string | Object 代理设置
        // 设置代理
        proxy: {
            "/DataPortalRQ": {
                target: "http://42.56.90.221:8081",
                changeOrigin: true
            },
            "/api": {
                target: "http://hgpm.hoppre.haier.net",
                changeOrigin: true
            },
        }
    },
    
}
