const express = require("express");
const router = express.Router();

const { postController } = require("../controller");

router.get("/:id/postdetail", postController.postdetail.get);

router.get("/phasepost", postController.phasepost.get);

router.post("/createpost", postController.createpost.post);

router.post("createphase", postController.createphase.post);

router.post("updateuser_post", postController.updateuser_post.post);

router.get("/totalpost?label", postController.totalpost.get);

router.get("/created_by_user_simplyfied", postController.created_by_user.get);

router.get("/join_by_user_simplyfied", postController.join_by_user.get);

router.get("like_by_user_simplyfied", postController.like_by_user);

module.exports = router;
