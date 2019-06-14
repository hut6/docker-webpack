/* Config */
const ModulesPath = ["node_modules", "/usr/local/lib/node_modules"];

/* Plugins */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Sass = require('sass');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Autoprefixer = require('autoprefixer');

module.exports = (env, config) => {
    /* Config */
    let mode = config.mode || 'production';
    let devServer = env && env.devServer ? env.devServer : false;
    let https = env && env.https ? {key: fs.readFileSync("/etc/ssl/localhost.key"), cert: fs.readFileSync("/etc/ssl/localhost.crt")} : false;

    let outputPath = path.resolve(__dirname, 'public/build');
    let scheme = env && env.https || config.https ? 'https' : 'http';
    let outputPublicPath = (devServer ? `${scheme}://${devServer}/` : '/') + 'build/';

    return {
        mode: mode,
        entry: {'app': './assets/js/app.ts'},
        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ExtractTextPlugin.extract(
                        {
                            use: [
                                {loader: "css-loader", options: {sourceMap: true}},
                                {loader: "postcss-loader", options: {sourceMap: true,plugins: [Autoprefixer]}},
                                {loader: "sass-loader", options: {sourceMap: true, implementation: Sass }},
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
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                },
                {
                    test: /\.(woff|woff2|ttf|eot|otf)$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg|webp)$/,
                    loader: 'file-loader',
                }
            ]
        },
        devtool: mode === 'development' ? "cheap-module-eval-source-map" : "source-map",
        devServer: {
            disableHostCheck: true,
            host: "0.0.0.0",
            watchOptions: {poll: 500},
            publicPath: outputPublicPath,
            public: devServer || '127.0.0.0:8080',
            hot: true,
            headers: {'Access-Control-Allow-Origin': '*'},
            https: https,
        },
        plugins: [
            new webpack.DefinePlugin({"process.env.NODE_ENV": mode}),
            new ExtractTextPlugin({
                filename: "[name].[hash:8].bundle.css",
                disable: !!devServer,
            }),
            new ManifestPlugin({writeToFileEmit: true}),
            new CleanWebpackPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
            }),
        ],
        /* This is required to get webpack to recognise yarn global modules */
        resolveLoader: {
            modules: ModulesPath,
        },
        resolve: {
            modules: ModulesPath,
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
