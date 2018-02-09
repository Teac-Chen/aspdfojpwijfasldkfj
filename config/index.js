var path = require('path');

module.exports = {
    build: {
        prodEnv: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: '',
        copyAssetsSubDirectory: 'static',
        assetsPublicPath: './',
        staticPath:'./static/',
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 9090,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        staticPath:'/static/',
        proxyTable: {
        },
        cssSourceMap: false
    }
}
