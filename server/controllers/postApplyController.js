const postApplyService = require("../services/postApplyService");
const postApplyModel = require("../models/postApplyModel");

const createPostApply = async (req, res) => {
  const { name, title, summary } = req.body;
  if (!(name && title && summary))
    return res.status("400").send({
      errMessage: "Please fill all name, title, summary required areas!",
    });

  await postApplyService.postApply(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};

const getPostApply = async (req, res) => {
  try {
    const result = await postApplyModel
      .find({})
      .select("name title email phone");
    return res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
};
module.exports = {
  createPostApply,
  getPostApply,
};
