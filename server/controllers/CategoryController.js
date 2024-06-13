const Category = require("../models/JobCategory.js");
const slugify = require("slugify");
const positionModel = require("../models/Position.js");
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await Category.findOne({
      slug: slugify(name),
    });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exist",
      });
    }
    const category = await new Category({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const createPosition = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingPosition = await positionModel.findOne({
      slug: slugify(name),
    });
    if (existingPosition) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exist",
      });
    }
    const category = await new positionModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
module.exports = {
  createCategory,
  createPosition,
};
