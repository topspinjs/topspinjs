var webpack = require('webpack');

module.exports = {
  entry: {
    'bundle': './webclient/javascripts/app.js'
  , 'fetch': './webclient/javascripts/vendor/fetch.js'
  }
, output: {
    path: __dirname + '/public/js'
  , filename: '[name].js'
  , publicPath: '/static/'
  }
, resolve: {
    modulesDirectories: ['./webclient/javascripts', 'node_modules']
  , extensions: ['', '.js', '.jsx', '.css', '.scss']
  }
, devtool: 'eval'
, plugins: [
    new webpack.HotModuleReplacementPlugin()
  , new webpack.NoErrorsPlugin()
  ]
, module: {
    loaders: [
      {test: /.jsx?$/, exclude: /node_modules/, loaders: ['react-hot', 'babel?optional[]=runtime']}
    , {test: /\.scss$/, loader: 'style!css!sass?outputStyle=expanded'}
    ]
  }
, devServer: {
    contentBase: './webclient'
  , hot: true
  , inline: true
  , noInfo: true
  , port: 4001
  //, proxy: {
      //"*": "http://localhost:4000"
    //}
  }
}
