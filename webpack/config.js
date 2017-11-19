const webpack      = require('webpack');
const path         = require('path');
const pkg          = require('../config.json');

const webpackSettings = {
  entry: {
    app: 
      process.env.NODE_ENV === 'production' ? [
       path.join(process.cwd(), '/app/', 'app.jsx')
      ] : [
      'webpack-hot-middleware/client',
       path.join(process.cwd(), '/app/', 'app.jsx')
      ],
  },
  output: {
    path: path.join(process.cwd(), '/dist/js/'),
    publicPath: '/js/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?/,
      exclude: /(node_modules|bower_components)/,
      include: [path.join(process.cwd(), '/app/')],
      loaders: [
		  'babel-loader?presets[]=react,presets[]=es2015',
		  'webpack-module-hot-accept'
  	  ],
    }],
  },
  plugins: 
    process.env.NODE_ENV === 'production' ? 
    [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ] : [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.LoaderOptionsPlugin({
       debug: true
     })
    ]
};

exports.webpackSettings = webpackSettings;
