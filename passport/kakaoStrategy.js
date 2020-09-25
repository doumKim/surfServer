const KakaoStrategy = require("passport-kakao").Strategy;
const { User } = require("../models");

require("dotenv").config();

module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existedUser = await User.findOne({
            where: { sns_id: profile.id, provider: "kakao" },
          });
          if (existedUser) {
            done(null, existedUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              username: profile.displayName,
              sns_id: profile.id,
              provider: "kakao",
              avartar_url:
                profile._json && profile._json.properties.profile_image,
            });
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
