const webpack = require('webpack');

module.exports = env => [
    new webpack.DefinePlugin({
        __IS_BROWSER__ : false
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    })
]
