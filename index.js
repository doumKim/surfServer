const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");
const AWS = require("aws-sdk");

require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const userRouter = require("./routes/user");
//const postRouter = require("./routes/post");

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "surfsurf",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  //const test = req.query.hello(category) + req.query.test(hot, recent);
  //res.send(test);
  res.end("Success");
});

app.use("/user", userRouter);
//app.use("/post", postRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

module.exports = app;
