
// const CompressionPlugin = require('compression-webpack-plugin')
// 在vue-config.js 中加入
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';
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
            "/admin":{
                target: "http://api.hyt.dslyy.com",
                changeOrigin: true
            }
            // "/testController": {
            //     target: "http://192.168.11.172:8081",
            //     changeOrigin: true
            // },
        },
    },
    configureWebpack: {
        // 关闭 webpack 的性能提示
        performance: {
            hints:false
        },
 
        //或者
 
        // //警告 webpack 的性能提示
        // performance: {
        //     hints:'warning',
        //     //入口起点的最大体积
        //     maxEntrypointSize: 50000000,
        //     //生成文件的最大体积
        //     maxAssetSize: 30000000,
        //     //只给出 js 文件的性能提示
        //     assetFilter: function(assetFilename) {
        //         return assetFilename.endsWith('.js');
        //     }
        // }
    },
    // configureWebpack: (config) => {
    //     if (process.env.NODE_ENV === 'production') {
    //         // 为生产环境修改配置...
    //         config.mode = 'production'
    //         return {
    //             plugins: [new CompressionPlugin({
    //                 test: /\.js$|\.html$|\.css/, //匹配文件名
    //                 threshold: 10240, //对超过10k的数据进行压缩
    //                 deleteOriginalAssets: false //是否删除原文件
    //             })]
    //         }
    //     }
    // },
    configureWebpack: config => {
        if (isProduction) {
          config.plugins.push(new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
          }))
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
