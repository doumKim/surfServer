const { User } = require("../../models");

module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    const sess = req.session;
    User.findOne({
      where: {
        email: email,
        password: password,
      },
    })
      .then(result => {
        if (result === null) {
          res.status(401).send("Wrong email or password");
        } else {
          sess.userid = result.id; // session에 userid넣어줌
          sess.userdata = result; // session에 userdata넣어줌 (둘중 한개만해도되는데)
          res.status(200).json({
            id: result.id,
            avartar_url: result.avartar_url,
          });
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
};
