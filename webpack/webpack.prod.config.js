const common = require('./webpack.common.config');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')


module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:10].js'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader' ],
            },
            {
                test: /\.(png|jpg|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    }
                },
                generator: {
                    filename: './images/[name].[contenthash:10][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 40
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:10].css'
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(
                `${path.join(__dirname, '../src')}/**/*`,
                { nodir: true }
            )
        })
    ]
})