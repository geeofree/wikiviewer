module.exports = {
  entry: __dirname + "/entry.js",
  output: {
    path: __dirname,
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
