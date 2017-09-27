module.exports = {
  entry: './build/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['react', 'env'],
          plugins: ['transform-class-properties', 'add-module-exports']
        }
      },
    ]
  },
  output: {
    filename: './dist/react-experiments.js',
    libraryTarget: 'umd',
    library: 'ReactExperiments'
  },
  externals: [
    {
      "react": {
        root: "React",
        commonjs2: "react",
        commonjs: "react",
        amd: "react"
      }
    }
  ]
}
