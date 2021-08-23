module.exports = {
  pages: {
    index: {
      entry: "src/index.ts",
      template: "public/index.html",
      filename: "index.html",
    },
  },
  parallel: false,
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.module.rule("ts").uses.delete("cache-loader");
      config.module
        .rule("ts")
        .use("ts-loader")
        .loader("ts-loader")
        .tap((opts) => {
          opts.transpileOnly = false;
          opts.happyPackMode = false;
          return opts;
        });
    }
  },
};
