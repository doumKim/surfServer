//const { users } = require("../../models");

/*module.exports = {
  post: (req, res) => {
    const { email, password } = req.body;
    const sess = req.session;
    users
      .findOne({
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
            avatar_url: result.avatar_url,
          });
        }
      })
      .catch(err => {
        res.status(404).send(err);
      });
  },
};*/
