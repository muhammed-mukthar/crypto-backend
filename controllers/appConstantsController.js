const { AppConstant } = require("../models/AppConstant");
const { handleAsync } = require("../shared/handleAsync");

const addConstants = handleAsync(async (req, res) => {
  const { name, value } = req.body;

  if (!name || !value)
    return res
      .status(400)
      .json({ message: "All fields are required!", data: [] });

  const constantExists = await AppConstant.findOne({
    name,
  });

  if (constantExists) {
    constantExists.value = value;
    const updatedConstant = await constantExists.save();
    if (updatedConstant) {
      return res.status(200).json({ message: "Success", data: [] });
    }
  }

  const appConstant = new AppConstant({
    name,
    value,
  });

  const savedConstant = await appConstant.save();
  if (savedConstant)
    return res.status(201).json({ message: "Success", data: [] });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

const getConstant = handleAsync(async (req, res) => {
  const { name } = req.params;
  if (name == "walletAddress") {
    const walletAddress = process.env.ADMIN_WALLET;
    return res.status(200).json({ message: "Success", data: walletAddress });
  }
  const constantExist = await AppConstant.findOne({ name });

  if (constantExist)
    return res
      .status(200)
      .json({ message: "Success", data: constantExist.value });

  return res.status(400).json({ message: "Invalid Request", data: [] });
});

module.exports = { addConstants, getConstant };
