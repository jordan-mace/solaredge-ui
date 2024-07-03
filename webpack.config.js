const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.tsx",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devtool: "inline-source-map",
  output: { path: path.join(__dirname, "/dist"), filename: "[name].bundle.js" },
  devtool: "inline-source-map",
  devServer: { static: "./dist" },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader" },
      { test: /\.ts?$/, exclude: /node_modules/, loader: "ts-loader" },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  plugins: [
    new webpack.DefinePlugin({
      // the correct way
      "process.env.SE_API_HOST": JSON.stringify(process.env.SE_API_HOST),
      "process.env.SE_API_PORT": JSON.stringify(process.env.SE_API_PORT),
      "process.env": JSON.stringify(process.env),
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
