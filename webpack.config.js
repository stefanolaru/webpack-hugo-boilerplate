// webpack v4
const path = require("path");
// const webpack = require('webpack');
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = {
    entry: { main: "./src/index.js" },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    devServer: {
        contentBase: path.join(process.cwd(), "./build"),
        compress: false,
        watchContentBase: true,
        quiet: false,
        open: true,
        port: 9000,
    },
    output: {
        path: path.join(__dirname, "./build"),
        publicPath: "/",
        filename: "[name].[hash].js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                ],
            },
            {
                test: /\.(gif|png|jpe?g|ico|svg)$/i,
                use: [
                    "file-loader",
                    {
                        loader: "image-webpack-loader",
                        options: {
                            // bypassOnDebug: true,
                            outputPath: "img/",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css",
        }),
        new AssetsPlugin({
            filename: "webpack.json",
            path: path.join(process.cwd(), "website/data"),
            prettyPrint: true,
        }),
        new WebpackMd5Hash(),
    ],
};
