const express = require("express");
const router = express.Router();
const { Post } = require("../models");
var AWS = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
require("dotenv").config();

const { postController } = require("../controller");

let s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "surfapp.tk/surfTitleImage", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE, // 자동을 콘텐츠 타입 세팅
    acl: "public-read", // 클라이언트에서 자유롭게 가용하기 위함
    key: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
  //limits: { fileSize: 5 * 1024 * 1024 }, // 용량 제한
});

router.get("/allWave", postController.allWave.get);

router.post("/:id/clickLike", postController.clickLike.post);

router.post(
  "/createPhaseWave/:id?currentPhase=query",
  postController.createPhaseWave.post
);

router.post("/createWave", postController.createWave.post);

router.get(
  "/joinWaveList?count=query$sort=query2",
  postController.joinWaveList.get
);

router.get("/likeWave?sort=query", postController.likeWave.get);

router.get(
  "/myWaveList?count=query&sort=query2",
  postController.myWaveList.get
);

router.get("/:id/phaseWave?phase=query", postController.phaseWave.get);

router.post("/thumnail", upload.single("img"), (req, res) => {
  let payLoad = { url: req.file.location };
  Post.update(
    {
      title_image: payLoad,
    },
    {
      where: {
        create_user: req.session.passport.user,
      },
    }
  ).then(() => {
    res.status(200).send("Successfuly changed titleImage");
  });
});

router.get("/:id/wave", postController.wave.get);

module.exports = router;
