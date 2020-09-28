const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { signUp, signIn, signOut } = require("../controller/user");
const { isLogggein, isNotLoggedIn } = require("./middlewares/auth");

const router = express.Router();

router.post("/signUp", isNotLoggedIn, signUp);

router.post("/signIn", isNotLoggedIn, signIn);

router.get("/signOut", isLogggein, signOut);

router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: process.env.CLIENT_URL,
  }),
  (req, res) => {
    res.redirect(301, process.env.CLIENT_URL);
  }
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: process.env.CLIENT_URL,
  }),
  (req, res) => {
    res.redirect(301, process.env.CLIENT_URL);
  }
);

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_URL,
  }),
  (req, res) => {
    res.redirect(301, process.env.CLIENT_URL);
  }
);

module.exports = router;
