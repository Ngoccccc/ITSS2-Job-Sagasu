const express = require("express");
const {
  createPost,
  getAllPosts,
} = require("../controllers/RecruitmentPostController.js");

//router object
const router = express.Router();

//routes

//getALl category
// router.get("/get-all-category", getAllCategory);
// router.get("/get-all-category-admin", getAllCategoriesForAdmin);

//single category
// router.get("/single-category/:slug", getSingleCategory);

// create category
router.post("/create-post", createPost);
router.get("/get-posts", getAllPosts);

module.exports = router;
