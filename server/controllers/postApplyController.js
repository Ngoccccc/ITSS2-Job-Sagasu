const postApply = require("../services/postApplyService");

const createPostApply = async (req, res) => {
  const { name, title, summary } = req.body;
  if (!(name && title && summary))
    return res
      .status("400")
      .send({ errMessage: "Please fill all name, title, summary required areas!" });

  await postApply.postApply(req.body, (err, result) => {
    if (err) return res.status(400).send(err);
    return res.status(201).send(result);
  });
};

module.exports = {
  createPostApply,
};