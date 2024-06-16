const express = require("express");
const postApplyController = require("../controllers/postApplyController");
const router = express.Router();

router.post("/create", postApplyController.createPostApply);
// router.post("/get-user-with-email", userController.getUserWithMail);
router.get("/all-post", postApplyController.getPostApply);

module.exports = router;
