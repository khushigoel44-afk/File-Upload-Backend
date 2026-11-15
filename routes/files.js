const express = require("express");
const router = express.Router();

const {localfileupload, uploadimages, videoupload} = require("../controllers/fileupload.js");

router.post("/localfileupload", localfileupload);
router.post("/uploadimages", uploadimages);
router.post("/videoupload", videoupload);

module.exports = router;