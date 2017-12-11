const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

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
                use: ExtractTextPlugin.extract(
                    {
                        use: ["css-loader", "sass-loader"],
                        fallback: "style-loader"
                    }
                )
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: 'app.bundle.css'}),
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
