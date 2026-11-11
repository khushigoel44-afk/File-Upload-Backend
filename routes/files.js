const express = require("express");
const router = express.Router();

const {localfileupload} = require("../controllers/fileupload.js");

router.post("/localfileupload", localfileupload);

module.exports = router;