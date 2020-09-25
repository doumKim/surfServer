const { User } = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      const sess = req.session;
      const result = await User.findOne({
        where: {
          id: sess.userId,
          password: req.body.prevPassword,
        },
      });
      if (result) {
        await User.update(
          { password: req.body.nextPassword },
          {
            where: {
              id: sess.userId,
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
