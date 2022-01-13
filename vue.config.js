const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  devServer: {
    port: 14000,
    hotOnly: true,
  },
  lintOnSave: true,
  productionSourceMap: false,
  // assetsDir: 'static',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('lin', resolve('src/lin'))
      .set('assets', resolve('src/assets'))
    config.module
      .rule('typescript')
      .use('babel-loader')
      .loader('babel-loader')
      .end()
    config.module
      .rule('typescript')
      .test(/\.ts$/)
      .exclude.add(/node_modules|\.d\.ts$/)
      .end()
      .use('ts-loader')
      .loader('ts-loader')
      .tap(options => {
        options = {
          transpileOnly: true,
          onlyCompileBundledFiles: true,
          happyPackMode: true,
          appendTsSuffixTo: [/\.vue$/],
        }
        return options
      })
    config.module
      .rule('ignore')
      .test(/\.d\.ts$|\.md$/)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end()
  },
  configureWebpack: config => {
    config.devtool = 'source-map'
    config.resolve.extensions = ['.ts', '.js', '.json', '.vue', '.scss', '.html']
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log', 'console.error']
      return {
        plugins: [
          // Gzip
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|jpg|jpeg|svg)$/, // 需要压缩的文件类型
            threshold: 100, // 归档需要进行压缩的文件大小最小值
            deleteOriginalAssets: false, // 是否删除原文件
            minRatio: 0.8, //压缩率达到20%才会压缩
          }),
          // Brotli
          new CompressionPlugin({
            filename: '[path][base].br',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|jpg|jpeg|svg)$/,
            compressionOptions: {
              level: 11,
            },
            threshold: 100,
            minRatio: 0.8,
          }),
        ],
      }
    }
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/shared.scss";',
      },
    },
  },
  // node_modules依赖项es6语法未转换问题
  transpileDependencies: ['vuex-persist', 'element-plus'],
}
