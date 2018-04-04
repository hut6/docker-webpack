/* Plugins */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/* Config */
const OUTPUT_PATH = path.resolve(__dirname, 'public/dist');
const OUTPUT_PUBLIC_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {'app': './src/index.js'},
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: ["css-loader", "sass-loader"],
                        fallback: "style-loader"
                    }
                )
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {configFile: 'tsconfig.json'}
                },
                exclude: /node_modules/,
            },
        ]
    },
    devServer: {
        // contentBase: outputPath,
        disableHostCheck: true,
        host: "0.0.0.0",
        watchOptions: {poll: 1000},
    },
    plugins: [
        new ManifestPlugin({writeToFileEmit:true}),
        new ExtractTextPlugin({filename: 'app.bundle.css'}),
        new CleanWebpackPlugin([OUTPUT_PATH]),
    ],
    /* This is required to get webpack to recognise yarn global modules */
    resolveLoader: {
        modules: ["node_modules", process.env.NODE_PATH],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: OUTPUT_PATH,
        publicPath: OUTPUT_PUBLIC_PATH,
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 100,
    }
};
