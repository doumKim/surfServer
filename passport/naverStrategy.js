const NaverStrategy = require("passport-naver").Strategy;
const { User } = require("../models");
require("dotenv").config();

module.exports = passport => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const existedUser = await User.findOne({
            where: { sns_id: profile.id, provider: "naver" },
          });
          if (existedUser) {
            done(null, existedUser);
          } else {
            const { _json, displayName, id } = profile;
            const newUser = await User.create({
              email: _json && _json.email,
              username: displayName,
              sns_id: id,
              provider: "naver",
              avartar_url: _json && _json.profile_image,
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
