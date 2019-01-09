const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const loaders = require('./loaders/server.js');
const plugins = require('./plugins/server.js');

module.exports = env => ({
	target: 'node',
	externals: [nodeExternals()],
    entry: {
		['app.ssr']: [
            path.resolve(__dirname, '../../src/client/components/App.js')
        ]
	},
    output: {
        path: path.resolve(__dirname, '../../src/server/views'),
        library: 'default',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: loaders(env)
    },
    plugins: plugins(env)
});
