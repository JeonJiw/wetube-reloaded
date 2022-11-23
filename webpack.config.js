const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", //변경하고 싶은 파일의 경로
  output: {
    filename: "main.js", //변경한 파일의 이름. 달라도 됨
    path: path.resolve(__dirname, "assets", "js"), //변경 후 여기에 저장
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
