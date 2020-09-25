const express = require("express");
const router = express.Router();

const { postController } = require("../controller");

router.get("/:id/wave", postController.wave.get);

router.get("/:id/phaseWave?phase=query", postController.phaseWave.get);

router.post("/createWave", postController.createWave.post);

router.post("/:id/createphaseWave", postController.createPhaseWave.post);

router.get(
  "/allWave?category=params1&sort=params2",
  postController.allWave.get
);

router.get("/myWaveList", postController.myWaveList.get);

router.get("/joinWaveList", postController.joinWaveList.get);

router.get("/likeWave", postController.likeWave.get);

route.post("/thumnail", postController.thumbnail.post);

module.exports = router;
