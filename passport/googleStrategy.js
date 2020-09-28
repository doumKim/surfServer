const GoogleStrategy = require("passport-google").Strategy;
const { User } = require("../models");

require("dotenv").config();

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existedUser = await User.findOne({
            where: { sns_id: profile.id, provider: "google" },
          });
          if (existedUser) {
            done(null, existedUser);
          } else {
            const newUser = await User.create({
              //profile 확인하고 내용 넣어주기
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
