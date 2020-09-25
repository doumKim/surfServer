const passport = require("passport");

module.exports = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    } else if (!user) {
      return res.status(401).send(info.message);
    } else {
      return req.login(user, loginError => {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        return res.status(201).send("login success.");
      });
    }
  })(req, res, next);
};
