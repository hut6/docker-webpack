const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry: ['./app.js', './style.scss'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "resolve-url-loader"
                    }, {
                        loader: "sass-loader", options: {sourceMap: true}
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [
        extractSass
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    resolveLoader: {
        modules: ['/usr/local/share/.config/yarn/global/node_modules']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
