const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
            const { _json, displayName, id } = profile;
            const newUser = await User.create({
              email: _json && _json.email,
              username: displayName,
              sns_id: `${id}`,
              provider: "google",
              avartar_url: _json && _json.picture,
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
