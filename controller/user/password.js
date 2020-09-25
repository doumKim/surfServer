const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const sess = req.session;
      const result = await User.findOne({
        where: {
          id: sess.userid,
          password: req.body.currentPassword,
        },
      });
      if (result) {
        await User.update(
          { password: req.body.changePassword },
          {
            where: {
              id: sess.userid,
            },
          }
        );
        res.status(200).send("Sucessfuly changed");
      }
    } catch (err) {
      res.status(400).send("your current password is wrong");
    }
  },
};
