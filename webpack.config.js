const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const port = 3001;

function styleLoaderList({extract = false, sass = false}) {
    const loaders = [{
        loader: 'css-loader',
        options: {
            importLoaders: 1
        }
    }, {
        loader: 'postcss-loader',
        options: {
            config: {
                path: path.resolve(__dirname, 'postcss.config.js')
            }
        }
    }];
    if (sass) {
        loaders.push('sass-loader');
    }
    if (extract) {
        return ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: loaders
        });
    }
    return ['style-loader'].concat(loaders);
}

module.exports = ({production} = {}) => {
    const config = {
        devtool: (production ? 'hidden-source-map' : 'eval-source-map'),
        entry: [
            // 'babel-polyfill',
            path.resolve(__dirname, 'src/index.jsx')
        ],
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        resolve: {
            extensions: ['.js', '.jsx']
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                use: styleLoaderList({extract: production})
            }, {
                test: /\.scss/,
                use: styleLoaderList({extract: production, sass: true})
            }, {
                test: /\.(eot|woff2?|otf|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[hash].[ext]'
                }
            }, {
                test: /\.(cyp|txt)$/,
                use: 'raw-loader'
            }]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                favicon: path.resolve(__dirname, 'src/assets/favicon.ico')
            })
        ],
        stats: {
            children: false
        },
        node: {
            fs: 'empty'
        }
    };

    if (production) {
        config.plugins = config.plugins.concat([
            new ExtractTextPlugin('[contenthash].bundle.css'),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            })
        ]);
    } else {
        config.devServer = {
            port,
            contentBase: path.resolve(__dirname, 'src')
        };
    }

    return config;
};
