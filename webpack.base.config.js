module.exports = {
  entry: 'index.js',  // 入口文件
  output: {
    filename: 'bundle.js',

  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // 支持.js和.jsx文件
  },
  devServer: {

    compress: true,
    port: 3000,  // 开发服务器端口
  },
};
