// use debugger; to debug

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/variables.scss";
        `
      }
    }
  }

  /**
   * for Debugger for Chrome - VS Code
   */
  // configureWebpack: {
  //   devtool: "source-map"
  // }
};
