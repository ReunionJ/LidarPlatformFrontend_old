// 自行定义打包过程
module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer:{
    //     proxy:{
    //         ["/dev-api"]:{
    //         target:'http://127.0.0.1:8082/augment/',
    //           changeOrigin:true,
    //             pathRewrite: {
    //                 ['^' + "/dev-ap"]: ''
    //             }
    //         }
    //     }

    // }
}