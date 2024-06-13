const postApplyModel = require("../models/postApplyModel");


const postApply = async (post, callback) => {
  const newPost = postApplyModel({ ...post});
  await newPost
    .save()
    .then((result) => {
      return callback(false, { message: "Post created successfuly!" });
    })
    .catch((err) => {
      return callback({ errMessage: "Post error!", details: err });
    });
};

module.exports = {
  postApply,
}