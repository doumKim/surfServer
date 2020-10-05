module.exports = {
  isLoggedin: (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send("로그인 필요한 작업입니다.");
    }
  },

  isNotLoggedIn: (req, res, next) => {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.redirect(301, "/");
    }
  },
};
