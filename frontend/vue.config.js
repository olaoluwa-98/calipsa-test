module.exports = {
  devServer: {
    proxy: {
      "^/v1": {
        target: "http://localhost:3000", // backend url on development
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
