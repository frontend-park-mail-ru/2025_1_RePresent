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
        {
            loader: 'string-replace-loader',
            options: {
                multiple: [
                    { search: 'ENV_API_ORIGIN', replace: 'http://re-target.ru' },
                    { search: 'ENV_API_VERSION', replace: 'v1' },
                ],
            },
        }
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
