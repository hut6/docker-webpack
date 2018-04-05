/* Plugins */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = env => {
    let devServer = env && env.devServer ? env.devServer : false;

    /* Config */
    let outputPath = path.resolve(__dirname, 'public/build');
    let outputPublicPath = (devServer ? 'http://'+ devServer + '/' : '/') + 'build/';
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
        devtool: devServer ? "cheap-module-eval-source-map" : "source-map",
        devServer: {
            disableHostCheck: true,
            host: "0.0.0.0",
            watchOptions: {poll: 500},
            publicPath: outputPublicPath,
            public: devServer,
            hot: true,
            headers: {'Access-Control-Allow-Origin': '*'}
        },
        plugins: [
            new ExtractTextPlugin({
                filename: "[name].[hash:8].bundle.css",
                disable: !!devServer,
            }),
            new ManifestPlugin({writeToFileEmit: true}),
            new CleanWebpackPlugin([outputPath]),
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
            filename: '[name].[hash:8].bundle.js',
            path: outputPath,
            publicPath: outputPublicPath,
        },
        watchOptions: {
            poll: 1000,
            aggregateTimeout: 100,
        }
    }
};
