const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/get-user-with-email", userController.getUserWithMail);
router.post("/get-active-user", userController.getActive);
router.post("/admin/active-user", userController.activeUser);
router.get("/admin/get-inactive-user", userController.getInactiveUser);


module.exports = router;