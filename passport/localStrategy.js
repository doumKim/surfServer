const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = passport => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const existedUser = await User.findOne({ where: { email } });
          if (existedUser) {
            const compareResult = await bcrypt.compare(
              password,
              existedUser.password
            );
            if (compareResult) {
              done(null, existedUser);
            } else {
              done(null, false, { message: "Password was not correct." });
            }
          } else {
            done(null, false, { message: "This email was not registered." });
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
