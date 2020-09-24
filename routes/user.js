const express = require("express");
const router = express.Router();

const { usersController } = require("../controller");

router.get("/userdata", usersController.userdata.get);

router.post("/signin", usersController.signin.post);

router.post("/signup", usersController.signup.post);

router.post("signout", usersController.signout.post);

router.post("/changeimage", usersController.changeimage.post);

router.post("/password", usersController.password.post);

module.exports = router;
