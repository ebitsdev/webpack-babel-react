const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = "development";
let target = "web";
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({
    template: "./src/template.html",
  }),
];

if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}
module.exports = {
    mode: mode,    
    module: {
        rules: [
            {
                test: /\.(s[ac]|c)ss$/i,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader, 
                    
                },
                "css-loader",
                "postcss-loader",
                "sass-loader",
            ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        // watchContentBase: true,
        port: 4500,
        hot: true, //hot reloading for development
    },
    plugins: plugins,
}