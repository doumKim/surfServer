const express = require("express");
const session = require("express-session");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = 3000;

// middlewares
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

app.use("/user", () => {});
app.use("/post", () => {});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

module.exports = app;
