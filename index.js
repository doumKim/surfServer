const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const { sequelize } = require("./models");
const postRouter = require("./routes/post");
const AWS = require("aws-sdk");
const passport = require("passport");
const passportConfig = require("./passport");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const app = express();
passportConfig(passport);
const PORT = process.env.PORT || 4000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

// middlewares
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    secureProxy: true,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.end("Hellow World.");
});

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(PORT, () => {
  console.log(`Port number is ${PORT}.`);
});

module.exports = app;
