module.exports =  env => [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            useBuiltIns: 'usage',
                            targets: 'last 2 versions, not dead'
                        }
                    ],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-transform-react-display-name',
                    '@babel/plugin-proposal-optional-chaining',
                    '@babel/plugin-transform-react-jsx',
                    ['@babel/plugin-proposal-decorators', { legacy: true }],
                    '@babel/plugin-syntax-dynamic-import',
                    '@babel/plugin-proposal-export-default-from',
                    ['@babel/plugin-proposal-class-properties', { loose: false }],
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-transform-react-constant-elements',
                    'react-loadable/babel',
                    'react-hot-loader/babel',
                    [
                        'react-css-modules',
                        {
                            webpackHotModuleReloading: true,
                            generateScopedName: '[name]-[local]',
                            handleMissingStyleName: 'warn',
                            filetypes: {
                                '.scss': {
                                    syntax: 'postcss-scss'
                                },
                                '.sass': {
                                    syntax: 'postcss-sass'
                                }
                            }
                        }
                    ]
                ],
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
