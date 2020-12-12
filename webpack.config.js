const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        //filename: '[name].[contenthash].js', // default: main.js
    
    },
    devtool: 'inline-source-map', // readable src code in dist/
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port:5001,
        watchContentBase: true,
        open: true
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        require('autoprefixer')
                                    ],
                                ],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        require('autoprefixer')
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                  outputPath: 'assets',
                  name: '[name].[ext]'
                },
               
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
                // {
                //     from: path.resolve(__dirname, 'src/assets/img'),
                //     to: path.resolve(__dirname, 'dist/assets/img')
                // },
            ],
        }),
        new MiniCssExtractPlugin({
           // filename: "[name].[contenthash].css"
           filename: 'style.css'
        }),
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new HtmlWebpackPlugin({
            title: 'Web Dev',
            template: './src/index.html',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new HtmlMinimizerPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
};