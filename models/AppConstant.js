const mongoose = require("mongoose");

const appConstantSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      lower: true,
    },
    value: {
      type: String,
      lower: true,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const AppConstant = mongoose.model("AppConstant", appConstantSchema);

module.exports = { AppConstant };
