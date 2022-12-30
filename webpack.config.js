const path = require("path");

module.exports = {
  entry: "./scripts/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "result.js",
  },
};
module = {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    },
  ],
};
