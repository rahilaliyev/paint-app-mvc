/** @format */

// Import the 'path' module to work with file paths
const path = require("path");
// Import the 'HtmlWebpackPlugin' to generate an HTML file with correct bundles
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Import the 'MiniCssExtractPlugin' to extract CSS into separate files
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//Clears out anything in the dist folder after each build. This is important //to ensure no old data gets left behind.
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Export the webpack configuration object
module.exports = {
  // Entry point of the application
  entry: "./src/js/index.js",
  // Output configuration for bundled files
  output: {
    // Resolve the output path to an absolute directory
    path: path.resolve(__dirname, "dist"),
    // The filename of the bundled JavaScript
    filename: "bundle.js",
  },
  // Module rules for processing different file types
  module: {
    rules: [
      {
        // Test for JavaScript files
        test: /\.js$/,
        // Exclude 'node_modules' directory from processing
        exclude: /node_modules/,
        // Use 'babel-loader' for transpiling JavaScript
        use: "babel-loader",
      },
      {
        // Test for Sass/SCSS files
        test: /\.s[ac]ss$/i,
        // Use MiniCssExtractPlugin loader to extract CSS into separate files
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader", // Load CSS
          "sass-loader", // Convert Sass to CSS
        ],
      },
      // {
      //   test: /\.(png|jp(e*)g|svg)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8000, // Convert images < 8kb to base64 strings
      //         name: "assets/[hash]-[name].[ext]",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  // Plugins used in the build process
  plugins: [
    // Generate an HTML file with the bundled JavaScript
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // Extract CSS into a separate file
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new CleanWebpackPlugin(),
  ],
  // Development server configuration
  devServer: {
    // Serve content from the 'dist' directory
    static: path.join(__dirname, "dist"),
    // Specify the port for the development server
    port: 8080,
  },
};
