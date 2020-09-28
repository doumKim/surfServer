const { User } = require("../../models");
module.exports = {
  get: async (req, res) => {
    const session = req.session;
    try {
      const siginedUser = await User.findOne({
        where: { id: session.passport.user },
      });
      if (siginedUser) {
        res.status(200).json(siginedUser);
      } else {
        res.status(401).send("Invalid Access");
      }
    } catch (e) {
      console.error(e);
      res.status(401).send("Invalid Access");
    }
  },
};
