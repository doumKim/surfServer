const express = require("express");
const router = express.Router();

const { userController } = require("../controller");

router.get("/userdata", userController.userData.get);

router.post("/signin", userController.signin.post);

router.post("/signup", userController.signup.post);

router.post("/signout", userController.signout.post);

router.post("/changeimage", userController.changeImage.post);

router.post("/password", userController.password.post);

module.exports = router;
