// import darkTheme from '@ant-design/dark-theme';
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // {
            //     loader: 'less-loader',
            //     options: {
            //       modifyVars: darkTheme
            //     }
            //   },
            {
                loader: 'css-loader',
                options: {
                    lessOptions: {
                        modifyVars: {
                            'primary-color': '#1DA57A',
                            'link-color': '#1DA57A',
                            'border-radius-base': '2px'
                        },
                        javascriptEnabled: true
                    }
                }
            }
        ]
    },
    plugin: [
        [
            'import', {
                'libraryName': 'antd',
                'librabyDirectory': 'es',
                'style': 'css'
            }
        ]
    ],
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};
