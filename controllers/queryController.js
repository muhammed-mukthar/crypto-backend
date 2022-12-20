const { Query } = require("../models/Query");
const { handleAsync } = require("../shared/handleAsync");

const addQuery = handleAsync(async (req, res) => {
  const { name, phone, email, description, queryType } = req.body;

  if (!name || !description || !email || !phone || !queryType)
    return res
      .status(400)
      .json({ message: "All fields are required!", data: [] });

  const query = new Query({
    name,
    queryType,
    email,
    phone,
    description,
  });

  const savedQuery = await query.save();
  if (savedQuery) return res.status(201).json({ message: "Success", data: [] });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

const getAllQueries = handleAsync(async (req, res) => {
  const queries = await Query.find().sort("-createdAt");

  if (queries)
    return res.status(200).json({ message: "Success", data: queries });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

module.exports = { addQuery, getAllQueries };
