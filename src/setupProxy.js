const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/swagger", {
      target: "https://devqwerty-restapi.pgpp.co.kr",
      changeOrigin: true,
    })
  );
};
