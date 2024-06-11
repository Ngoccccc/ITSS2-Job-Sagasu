const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const {
  createCategory,
  createPosition,
} = require("../controllers/CategoryController.js");

//router object
const router = express.Router();

//routes

//getALl category
// router.get("/get-all-category", getAllCategory);
// router.get("/get-all-category-admin", getAllCategoriesForAdmin);

//single category
// router.get("/single-category/:slug", getSingleCategory);

// create category
router.post("/create-category", createCategory);
router.post("/create-position", createPosition);
module.exports = router;
