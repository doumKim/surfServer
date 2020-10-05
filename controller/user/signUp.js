const bcrypt = require("bcrypt");
const { User } = require("../../models");

module.exports = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const existedUser = await User.findOne({ where: { email } });
    if (existedUser) {
      return res.status(409).send("already exists email or username.");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      username,
      password: hash,
    });
    return res.status(201).send("Successfully Signed Up");
  } catch (err) {
    console.error(err);
  }
};
