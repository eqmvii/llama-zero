// frontend/vue.config.js
module.exports = {
  configureWebpack: {
    watchOptions: {
      poll: 1000, // Check for changes every 1000ms (1 second)
      ignored: /node_modules/,
    }
  }
  // Optional: ensure devServer settings if needed, though defaults are often fine
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080
  // }
};
