const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CrxAutoReloadPlugin  = require('crx-auto-reload-plugin');

const BUILD_OUT = path.resolve(__dirname, './client/build');

module.exports = {
    entry: {
        all_image_pages: './client/content-scripts/all-image-pages.ts',
        background: './client/background/background.ts'
    },
    output: {
        // To the `dist` folder
        path: path.resolve(__dirname, './client/build'),
        // With the filename `build.js` so it's dist/build.js
        filename: 'build-[name].js'
    },
    module: {
        // Special compilation rules
        rules: [            
            {   test: /\.ts$/, 
                use: ["ts-loader"],
                exclude: /node_modules/
            },       
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({          
            extractComments: false,                        
        })],
    },
    plugins: [
        //Copy static assets to /build
        new CopyWebpackPlugin([
            { from: 'manifest.json' },
            { from: 'client/styles', to: `${BUILD_OUT}/styles/` },
        ]),
        new CrxAutoReloadPlugin({
            interval: 2000, // watch interval
            openPopup: false, // should open popup page after plugin load/reload
        }),
    ],
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            "zlib": false,
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: 'eval-source-map',
    mode: 'development'
};
