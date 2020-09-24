const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./models");

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");

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
  res.end("Success");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});

module.exports = app;
