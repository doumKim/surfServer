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
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
