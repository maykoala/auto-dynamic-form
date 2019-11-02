const path = require("path");
const Visualizer = require("webpack-visualizer-plugin");

const config = {
  output: {
    path: path.resolve("lib"),
    filename: "Form.js",
    libraryTarget: "commonjs2"
  },
  externals: {
    "antd": "antd",
    "moment": "moment",
    "react": "react"
  },
  mode: "production",
  plugins: [
    new Visualizer({
      filename: "../stats.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              ["@babel/plugin-transform-arrow-functions", { spec: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.css/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      }
    ]
  }
};

module.exports = config;
