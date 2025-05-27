const path = require('path');

const stringReplaceLoader = {
    loader: 'string-replace-loader',
    options: {
        multiple: [
            { search: 'ENV_API_ORIGIN', replace: process.env.ORIGIN },
            { search: 'ENV_API_VERSION', replace: 'v1' },
            { search: 'ENV_MOBILE_MAX_WIDTH_PX', replace: '750', flags: 'g' },
        ],
    },
};

const webpackModule = {
    rules: [
        {
            test: /\.tsx?$/,
            use: ['ts-loader', stringReplaceLoader],
            exclude: /node_modules/,
        },
        {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', stringReplaceLoader, 'sass-loader'],
        },
    ],
};

const resolveScripts = {
    extensions: ['.tsx', '.ts', '.js'],
};

const distPath = path.resolve(__dirname, 'dist');
const mode = (process.env.PRODUCTION == 'true') ? 'production' : 'development';

module.exports = [
    {
        mode,
        devtool: 'source-map',
        entry: './src/index.ts',
        module: webpackModule,
        resolve: resolveScripts,
        output: {
            filename: 'bundle.js',
            path: distPath,
        },
    },
    {
        mode,
        devtool: 'source-map',
        entry: './src/indexCsat.ts',
        module: webpackModule,
        resolve: resolveScripts,
        output: {
            filename: 'bundleCsat.js',
            path: distPath,
        },
    },
];
