module.exports =  env => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                babelrc: true,
                cacheDirectory: true
            }
        }
    },
    {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                    disable: env.NODE_ENV === 'production'
                }
            }
        ]
    },
    // {
    //     test: /locales/,
    //     loader: '@alienfast/i18next-loader'
    // }
]
