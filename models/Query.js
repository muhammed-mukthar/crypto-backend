const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    queryType: {
      type: String,
      enum: ["ama", "general"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Query = mongoose.model("Query", querySchema);

module.exports = { Query };
