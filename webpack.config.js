const path = require('path');

const config = {
    output: {
        path: path.resolve('lib'),
        filename: 'Form.js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        react: 'react',
    },
    mode: 'production',
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            ["import",     
                            {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": "css"
                            }],
                            ["@babel/plugin-transform-arrow-functions", { "spec": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
                }
            },
            {
                test: /\.css/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }]
            },
        ]
    }
}

module.exports = config