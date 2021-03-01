const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')
const { config } = require('process')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('lin', resolve('src/lin'))
      .set('assets', resolve('src/asset'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.js', '.json', '.vue', '.scss', '.html']
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
            threshold: 100, // 归档需要进行压缩的文件大小最小值
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8, //压缩率达到20%才会压缩
          }),
        ],
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/style/share.scss";',
      },
    },
  },
  devServer: {
    port: 18080,
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist'],
}
