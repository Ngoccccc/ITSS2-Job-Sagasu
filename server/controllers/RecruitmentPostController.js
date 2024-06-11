const RecruitmentPost = require("../models/RecruitmentPost");

const createPost = async (req, res) => {
  try {
    const recruitmentPost = new RecruitmentPost(req.body);
    await recruitmentPost.save();
    res.status(201).send(recruitmentPost);
  } catch (error) {
    res.status(400).send(error);
  }
};
const getAllPosts = async (req, res) => {
  try {
    const recruitmentPosts = await RecruitmentPost.find().populate(
      "position category"
    );
    res.status(200).send(recruitmentPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
};
