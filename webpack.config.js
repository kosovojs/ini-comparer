var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const htmlOptionsDev = {
	template: './src/template.html',
};

const htmlOptionsProd = {
	template: './src/template.html',
	inject: true,
	filename: '../index.html',
	minify: {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
	},
};

const cssLoaders = (prod) => {
	if (prod) {
		return [MiniCssExtractPlugin.loader, 'css-loader'];
	}

	return ['style-loader', 'css-loader'];
};

const plugins = (PROD) => {
	if (!PROD) {
		return [new HtmlWebpackPlugin(htmlOptionsDev)];
	}

	return [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			openAnalyzer: false,
			reportFilename: 'bundle_sizes.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contentHash].css',
		})
	];
};

const prodOptimizations = {
	moduleIds: 'hashed',

	runtimeChunk: {
		name: 'manifest',
	},
	splitChunks: {
		chunks: 'all',
	},
	minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin(), new HtmlWebpackPlugin(htmlOptionsProd)],
};

module.exports = function (env, argv) {
	var PROD = argv.mode == 'production';
	console.log('PROD :', PROD);

	return {
		mode: PROD ? 'production' : 'development',
		entry: './src/index.js',
		output: {
			filename: PROD ? 'js/[name].[contentHash].js' : 'js/[name].js',
			path: path.resolve(__dirname, 'dist')
		},
		optimization: PROD ? prodOptimizations : {},
		module: {
			rules: [
				{
					test: /\.js/,
					exclude: /(node_modules|bower_components)/,
					use: [
						{
							loader: 'babel-loader',
						},
					],
				},
				{
					test: /\.css$/,
					use: cssLoaders(PROD),
				},
			],
		},
		performance: {
			hints: 'warning',
			maxAssetSize: 100 * 1024, // 100 KiB
			maxEntrypointSize: 100 * 1024, // 100 KiB
		},
		plugins: plugins(PROD),
		devServer: {
			hot: true,
			port: 8000,
		},
	};
};
