const express = require("express");
const passport = require("passport");
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
    failureRedirect: "http://surftest.tk",
  }),
  (req, res) => {
    res.redirect(301, "http://surftest.tk");
  }
);

router.get("/naver", passport.authenticate("naver"));

router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "http://surftest.tk",
  }),
  (req, res) => {
    res.redirect(301, "http://surftest.tk");
  }
);

router.get("/google", passport.authenticate("google"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://surftest.tk",
  }),
  (req, res) => {
    res.redirect(301, "http://surftest.tk");
  }
);

module.exports = router;
