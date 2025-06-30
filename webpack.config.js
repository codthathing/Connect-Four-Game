const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts", // Single entry point
  output: {
    filename: "index.js", // Single output file
    path: path.resolve(__dirname, "public/"),
  },
  resolve: {
    extensions: [".ts", ".js", ".css"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Target all .ts files
        use: "ts-loader", // Use ts-loader to compile them
        exclude: /node_modules/, // Don't compile 3rd-party code
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
};
