const { User } = require("../../models");
const bcrypt = require("bcrypt");
module.exports = {
  post: async (req, res) => {
    try {
      const sess = req.session;
      const existedUser = await User.findOne({
        where: { id: sess.passport.user },
      });
      if (existedUser) {
        const compareResult = await bcrypt.compare(
          req.body.prevPassword,
          existedUser.password
        );
        if (compareResult) {
          const hashed = await bcrypt.hash(req.body.nextPassword, 12);
          await User.update(
            { password: hashed },
            {
              where: {
                id: sess.passport.user,
              },
            }
          );
          res.status(200).send("Sucessfuly changed");
        }
      }
    } catch (err) {
      res.status(400).send("your current password is wrong");
    }
  },
};
