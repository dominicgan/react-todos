const webpack      = require('webpack');
const path         = require('path');
const pkg          = require('./config.json');
const environments = require('gulp-environments');

const webpackSettings = {
  entry: {
    app: [
      'webpack-hot-middleware/client',
       path.join(process.cwd(), '/app/', 'app.jsx')
    ],
  },
  output: {
    path: path.join(process.cwd(), '/dist/'),
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
     debug: true
   })
  ]
};

exports.webpackSettings = webpackSettings;
