const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const name = "SkillPeers";

module.exports = {
  publicPath: process.env.BASE_URL,
  assetsDir: process.env.BASE_URL,
  devServer: {
    proxy: {
      "^/api": {
         //target: "http://44.240.53.177",
        target: "http://localhost:8080",
        // target: "https://130.61.236.216",
        changeOrigin: true,
        ws: true,
      },
    },
    // port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  },
  pwa: {
    name: "SkillPeers",
    themeColor: "#172b4d",
    msTileColor: "#172b4d",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#172b4d",
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== "production",
  },
};
