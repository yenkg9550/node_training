let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");
const handleError = require("./service/handleError.js");

// 資料庫設定開始
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/testPost")
  .then((res) => console.log("連線資料成功"));
  
let app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
let indexRouter = require("./routes/index");
let usersRouter = require("./routes/users");

let postsRouter = require("./routes/posts");

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// catch 404
app.use((req, res, next) => {
  handleError({ res, status: 404, message: "API 路徑不存在" });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.type === "entity.parse.failed") {
    return handleError({ res, err, message: "格式錯誤" });
  }

  handleError({ res, err, status: err.status || 500 });
});

module.exports = app;
