const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch:true,
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "index.bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
      hash: true
    }),
    new MiniCSSExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [MiniCSSExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  }
};
