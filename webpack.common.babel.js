import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';
import CleanWebPackPlugin from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
const isDevMode = process.env.NODE_ENV !== 'production';

export default {
    context: path.join(__dirname, 'src'),
    entry: './index.tsx',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: [/node_modules/],
                'loaders': ['babel-loader','awesome-typescript-loader']
            },
            {
                test: /\.(js)$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'source-map-loader'
                },
                enforce: 'pre'
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    {
                        loader: isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (isDevMode) {
                                return '[path][name].[ext]';
                            }
                            return '/assets/images/[name].[hash].[ext]';
                        }
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name(file) {
                            if (isDevMode) {
                                return '[path][name].[ext]';
                            }
                            return '/assets/fonts/[name].[hash].[ext]';
                        }
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './index.html',
            filename: './index.html'
        }),
        new CleanWebPackPlugin(['dist'])
    ]
};