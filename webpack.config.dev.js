var HtmlPlugin = require("html-webpack-plugin");
var TextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: ["babel-polyfill", "whatwg-fetch", "./js/main"],
	output: {
		path: __dirname + "/dist",
		// publicPath: "/js/",
		filename: "./js/[name].js"
	},
	module : {
		loaders: [
			{
				test: /\.css$/,
				loader: TextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
			},
			{
				test: /\.less$/,
				loader: TextPlugin.extract({ fallback: "style-loader", use: "css-loader!less-loader" })
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		new TextPlugin("./styles/style.css"),
		new HtmlPlugin({
			title: "Front-camp task",
			filename: "./index.html",
			template: "./index.html"
		})
	],
	devServer: {
		contentBase: __dirname + "/dist"
	},
	devtool: "inline-source-map",
	watch: true
}