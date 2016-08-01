import webpack from 'webpack'
import path from 'path'
import autoprefixer from 'autoprefixer'
import NpmInstallPlugin from 'npm-install-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const isProd = (process.env.NODE_ENV === 'production');

const config = {
    cache: true,
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080/',
        'webpack/hot/dev-server',
        './src/js/index'
    ],
    output: {
        path: path.join(__dirname, 'build', 'assets'),
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    module: {
        preLoaders: [
            {
                test: /\.js?$/,
                include: [ path.resolve(__dirname, 'src') ],
                loaders: ['eslint']
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                include: [ path.resolve(__dirname, 'src') ],
                loader: 'babel'
            }
        ]
    },
    postcss: [
        autoprefixer({ browsers: ['last 2 versions'] })
    ],
    plugins: [
        new NpmInstallPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html'
        })
    ],
    devServer: {
        publicPath: '/assets',
        contentBase: './build',
        hot: true,
        compress: true,
        stats: { colors: true },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        headers: { 'Access-Control-Allow-Origin': '*' },
        host: '0.0.0.0',
        port: 8080
    }
}

if (isProd) {
    config.plugins.push(new ExtractTextPlugin('bundle.css', {allChunks: true}))
    config.module.loaders.push(
        {
            test: /\.styl$/,
            include: [ path.resolve(__dirname, 'src') ],
            loader:    ExtractTextPlugin.extract('stylus', 'css-loader!stylus-loader')
        }
    )
} else {
    config.module.loaders.push(
        {
            test: /\.styl$/,
            include: [ path.resolve(__dirname, 'src') ],
            loader: 'style-loader!css-loader!stylus-loader'
        }
    )
}

export default config