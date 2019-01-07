const path = require('path');

module.exports =  env => [
    {
        test: /\.sass$/,
        use: [
            {
                loader: 'css-loader/locals',
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName:
                        '[name]-[local]'
                }
            },
            {
                loader: 'sass-loader'
            },
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: require(path.join(
                        __dirname,
                        '../../../src/client/styles/settings/index.js'
                    ))
                }
            }
        ]
    }
]
