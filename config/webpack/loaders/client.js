const path = require('path');

module.exports =  env => {
    const isProd = env.NODE_ENV === 'production';
    return [
        {
            test: /\.sass$/,
            use: [
                !isProd && 'css-hot-loader',
                isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: !isProd,
                        modules: true,
                        localIdentName: '[name]-[local]'
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
            ].filter(loader => loader !== false)
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
    ];
}
