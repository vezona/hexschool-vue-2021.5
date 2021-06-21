module.exports = {
  publicPath: '/dist/',
  filenameHashing: false, //不要雜湊
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/css/common.scss";
        `
      }
    }
  }
}
