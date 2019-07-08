
module.exports = {
    outputDir: 'nissin',
    publicPath: process.env.NODE_ENV === 'production'
    ? './'
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
            "/task": {
                target: "http://47.92.121.252:8080",
                changeOrigin: true
            },
            // "/testController": {
            //     target: "http://192.168.11.172:8081",
            //     changeOrigin: true
            // },
        },
    },
    configureWebpack: {
        //关闭 webpack 的性能提示
        // performance: {
        //     hints:false
        // },
 
        //或者
 
        //警告 webpack 的性能提示
        performance: {
            hints:'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function(assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    chainWebpack:config => {
        config.plugins.delete('prefetch')
    },
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: false,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    }
    
}
