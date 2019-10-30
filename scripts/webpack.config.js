const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
	entry: './src/index.js',
	output: {
    path: path.resolve(process.cwd(), 'dist'),//防止dist目录打包到scripts目录下
    filename: 'js/[name].[chunkHash:8].js'
	},
	module: {//所有第三方模块的配置规则
		rules: [//第三方匹配规则
			{
				test: /\.css$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						//options: {
							//modules: {
								//mode: 'local',
								// localIdentName: '[path][name]__[local]--[hash:base64:5]'
							// },
						// }
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			{
				test: /\.less$/i,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								mode: 'local',
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							},
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'less-loader'
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'url-loader',
				options: {
					limit: 8192,
					name: 'images/[name].[ext]',
					publicPath: '/'
				},
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/plugin-transform-react-jsx',
							'@babel/plugin-proposal-class-properties',
							["import", {
								"libraryName": "antd",
								"libraryDirectory": "es",
								"style": "css" // `style: true` 会加载 less 文件
								}
							]
						]
					}
				}
			}	
		]
	},
	plugins: [
    	new HtmlWebpackPlugin({  
      	title: 'react-movie-demo',
      	template: 'public/index.html'
    	}),
    	new MiniCssExtractPlugin({
      	filename: 'css/[name].[chunkHash:8].css'
		}),
		new CopyPlugin([
			{
				from: path.resolve(process.cwd(), 'src/static'), 
				to: path.resolve(process.cwd(), 'dist/static'),
			}
	  	])
	],
	resolve: {
		extensions: ['.js', '.jsx', 'json'],//表示这几个文件的后缀名可以省略不写
		alias: {
			'@': path.join(__dirname, './src') //@表示项目根目录中src这一层
		}
	},
	devServer: {
		port: 3000,
		open: true
	}
}