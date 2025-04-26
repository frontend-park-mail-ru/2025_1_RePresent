const path = require('path');

const webpackModule = {
    rules: [
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
        },
    ],
};

const resolve = {
    extensions: ['.tsx', '.ts', '.js'],
};

const distPath = path.resolve(__dirname, 'dist');

module.exports = [
    {
        mode: 'development',
        devtool: 'source-map',
        entry: './src/index.ts',
        module: webpackModule,
        resolve,
        output: {
            filename: 'bundle.js',
            path: distPath,
        },
    },
    {
        mode: 'development',
        devtool: 'source-map',
        entry: './src/indexCsat.ts',
        module: webpackModule,
        resolve,
        output: {
            filename: 'bundleCsat.js',
            path: distPath,
        },
    },
];
