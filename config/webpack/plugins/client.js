const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = env => {
    const isProd = env.NODE_ENV === 'production';

    return [
        new webpack.DefinePlugin({
            __IS_BROWSER__: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[name].0[id].css",
        }),
        new ReactLoadablePlugin({
            filename: path.resolve(__dirname, '../../../public/assets/react-loadable.json')
        }),
        isProd && new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
        isProd && new CompressionPlugin()
    ].filter(plugin => plugin !== false);
};
