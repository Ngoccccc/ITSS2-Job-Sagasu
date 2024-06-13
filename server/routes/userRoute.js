const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/get-user-with-email", userController.getUserWithMail);
router.post("/get-active-user", userController.getActive);


module.exports = router;