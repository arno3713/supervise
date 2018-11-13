const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const loaderConfig = require('./config/loader.config')
const serverConfig = require('./config/server.config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var config = {
	// 入口配置
	entry: {
		jquery: 'jquery',
		index: './src/index.js'
	},
	// 出口配置
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'front/js/[name].js'
	},
	// 规则
	module: loaderConfig,
	// 服务器
	devServer: serverConfig,
	// 插件
	plugins: [
		new CleanWebpackPlugin(['dist']), //删除某个目录
		new webpack.HotModuleReplacementPlugin(), //热重载
		/* new HtmlWebpackPlugin({
			hash: true,
			title: 'a demo',
			template: './src/index.html'
		}), */
		new ExtractTextPlugin('front/css/site.css'), //提取css文件
		new webpack.ProvidePlugin({ //引入jQuery
			$: 'jqeury',
			jQuery: 'jquery'
		}),
		new CopyWebpackPlugin([{ //输出静态资源
			from: path.resolve(__dirname, 'src/assets'),
			to: './front'
		}])
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vender: {
					chunks: 'initial',
					name: 'jquery',
					enforce: true
				}
			}
		}
	}
}

var pages = getEntry('./src/pages/**/*.ejs');
// console.log(pages)
for (var pathname in pages) {
	var conf = {
		filename: path.resolve(__dirname, 'dist/' + pathname + '.html'),
		template: path.resolve(__dirname, './src/pages/' + pathname + '/' + pathname + '.js'),
		excludeChunks: ['jquery', 'index']
		// cache:true,
	}
	config.plugins.push(new HtmlWebpackPlugin(conf))
}

function getEntry(globPath, pathDir) {
	var files = glob.sync(globPath);
	// console.log(files)
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.join(dirname, basename);
		entries[basename] = './' + entry;
		// console.log(files.length, entry, dirname, basename, pathname, extname)
	}
	return entries;
}

module.exports = config;