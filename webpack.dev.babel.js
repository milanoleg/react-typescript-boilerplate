import webpack from 'webpack';
import merge from 'webpack-merge';
import commonConfig from './webpack.common.babel';

export default merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true,
        publicPath: '/',
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});