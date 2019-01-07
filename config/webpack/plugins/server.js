const webpack = require('webpack');

module.exports = env => [
    new webpack.DefinePlugin({
        __IS_BROWSER__ : false
    })
]
