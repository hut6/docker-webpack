/* Plugins */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* Config */
const OUTPUT_PATH = path.resolve(__dirname, 'public/build');
const OUTPUT_PUBLIC_PATH = (process.env.ASSET_PATH || '/') + 'build/';

module.exports = env => {
    let isDevServer = env && env.devServer;
    let nodeModules = ["node_modules"];
    if(process.env.NODE_PATH) {
        nodeModules.push(process.env.NODE_PATH);
    }

    return {
        entry: {'app': './assets/js/app.ts'},
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract(
                        {
                            use: [
                                {loader: "css-loader", options: {sourceMap: true}},
                                {loader: "sass-loader", options: {sourceMap: true}}
                            ],
                            fallback: {
                                loader: "style-loader",
                                options: {sourceMap: true}
                            }
                        }
                    )
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'ts-loader',
                        options: {configFile: 'tsconfig.json'}
                    },
                }
            ]
        },
        devtool: isDevServer ? "cheap-module-eval-source-map" : "source-map",
        devServer: {
            disableHostCheck: true,
            host: "0.0.0.0",
            watchOptions: {poll: 500},
            publicPath: OUTPUT_PUBLIC_PATH,
            public: process.env.ASSET_PATH || '/',
            hot: true,
            headers: {'Access-Control-Allow-Origin': '*'}
        },
        plugins: [
            new ExtractTextPlugin({
                filename: "[name].[hash].bundle.css",
                disable: isDevServer,
            }),
            new ManifestPlugin({writeToFileEmit: true}),
            new CleanWebpackPlugin([OUTPUT_PATH]),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
        ],
        /* This is required to get webpack to recognise yarn global modules */
        resolveLoader: {
            modules: nodeModules,
        },
        resolve: {
            modules: nodeModules,
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].[hash].bundle.js',
            path: OUTPUT_PATH,
            publicPath: OUTPUT_PUBLIC_PATH,
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 100,
        }
    }
};
