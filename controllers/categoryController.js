const { handleAsync } = require("../shared/handleAsync");
const { Category } = require("../models/Category");

const addCategory = handleAsync(async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description)
    return res
      .status(400)
      .json({ message: "All fields are required!", data: [] });

  const categoryExists = await Category.findOne({
    name,
  });

  if (categoryExists)
    return res
      .status(400)
      .json({ message: "Category already exists!", data: [] });

  const category = new Category({
    name,
    description,
  });

  const savedCategory = await category.save();
  if (savedCategory)
    return res.status(201).json({ message: "Success", data: [] });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

const getAllCategories = handleAsync(async (req, res) => {
  const categories = await Category.find().sort("name");

  if (categories)
    return res.status(200).json({ message: "Success", data: categories });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

module.exports = { addCategory, getAllCategories };
