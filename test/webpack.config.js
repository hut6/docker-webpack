const path = require('path');

module.exports = {
    entry: ['./app.js'],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    resolveLoader: {
        modules: ['/usr/local/lib/node_modules']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'test/dist')
    },
};
