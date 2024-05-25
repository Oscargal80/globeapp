// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Limpia el directorio de salida antes de cada construcción
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true, // Habilita la eliminación de código muerto
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
