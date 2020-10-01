const { User } = require("../../models");
module.exports = {
  get: (req, res) => {
    const sess = req.session;
    const attributes = [
      "id",
      "username",
      "email",
      "sns_id",
      "avartar_url",
      "level",
      "exp",
      "provider",
    ];
    if (sess.passport.user) {
      User.findOne({
        attributes: attributes,
        where: {
          id: sess.passport.user,
        },
      }).then(result => {
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(401).send("Invalid Access To User Info");
        }
      });
    }
  },
};
