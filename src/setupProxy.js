const { createProxyMiddleware } = require("http-proxy-middleware");
const API_SERVER_URL = process.env.REACT_APP_API_SERVER_URL
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/swagger", {
      target: "https://devqwerty-restapi.pgpp.co.kr",
      changeOrigin: true,
    })
  );
};
